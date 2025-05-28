import { db, storage, auth } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-storage.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

let submissionCount = 0;

// Elements for signup/login/logout
const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-password");
const signupButton = document.getElementById("signup-button");
const signupMessage = document.getElementById("signup-message");

const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginButton = document.getElementById("login-button");
const loginMessage = document.getElementById("login-message");

const logoutSection = document.getElementById("logout-section");
const logoutButton = document.getElementById("logout-button");

const storyForm = document.getElementById("storyForm");
const feedbackEl = document.getElementById("feedbackMessage");

// Container to show user stories and update/delete UI
const storiesList = document.getElementById("stories-list");

/**
 * USER ACCOUNT CREATION (SIGNUP)
 */
signupButton.addEventListener("click", async () => {
  signupMessage.textContent = "";
  signupButton.disabled = true;
  try {
    if (signupPassword.value.length < 6) {
      throw new Error("Password should be at least 6 characters");
    }
    await createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value);
    signupMessage.style.color = "green";
    signupMessage.textContent = "Account created! You can now log in.";
    signupEmail.value = "";
    signupPassword.value = "";
  } catch (error) {
    signupMessage.style.color = "red";
    signupMessage.textContent = error.message;
  } finally {
    signupButton.disabled = false;
  }
});

/**
 * LOGIN
 */
loginButton.addEventListener("click", async () => {
  loginMessage.textContent = "";
  loginButton.disabled = true;
  try {
    await signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value);
    loginMessage.style.color = "green";
    loginMessage.textContent = "Logged in successfully!";
    loginEmail.value = "";
    loginPassword.value = "";
  } catch (error) {
    loginMessage.style.color = "red";
    loginMessage.textContent = error.message;
  } finally {
    loginButton.disabled = false;
  }
});

/**
 * LOGOUT
 */
logoutButton.addEventListener("click", async () => {
  await signOut(auth);
  storiesList.innerHTML = ""; // Clear stories on logout
});

/**
 * AUTH STATE CHANGED - toggle UI and load user stories
 */
onAuthStateChanged(auth, async (user) => {
  if (user) {
    logoutSection.style.display = "block";
    document.getElementById("signup-section").style.display = "none";
    document.getElementById("login-section").style.display = "none";

    // Load current user's stories on login
    await loadUserStories(user.uid);
  } else {
    logoutSection.style.display = "none";
    document.getElementById("signup-section").style.display = "block";
    document.getElementById("login-section").style.display = "block";
    storiesList.innerHTML = "";
  }
});

/**
 * STORY SUBMISSION (CREATE)
 */
storyForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const user = auth.currentUser;
  if (!user) {
    feedbackEl.textContent = "You must be logged in to submit a story.";
    feedbackEl.style.color = "red";
    return;
  }

  const userName = document.getElementById("name").value.trim();
  const userEmail = document.getElementById("email").value.trim();
  const userStory = document.getElementById("story").value.trim();
  const mediaFile = document.getElementById("media").files[0];

  if (!userName || !userEmail || !userStory) {
    feedbackEl.textContent = "Please fill out all fields!";
    feedbackEl.style.color = "red";
    return;
  }

  try {
    let mediaURL = null;
    if (mediaFile) {
      const storageRef = ref(storage, `media/${Date.now()}_${mediaFile.name}`);
      await uploadBytes(storageRef, mediaFile);
      mediaURL = await getDownloadURL(storageRef);
    }

    await addDoc(collection(db, "stories"), {
      uid: user.uid,
      name: userName,
      email: userEmail,
      story: userStory,
      mediaURL: mediaURL,
      timestamp: new Date(),
    });

    submissionCount++;
    feedbackEl.textContent = `Thank you for sharing your story! Total submissions: ${submissionCount}`;
    feedbackEl.style.color = "green";
    storyForm.reset();

    // Reload stories list after submission
    await loadUserStories(user.uid);
  } catch (error) {
    console.error(error);
    feedbackEl.textContent = "Error submitting story. Please try again.";
    feedbackEl.style.color = "red";
  }
});

/**
 * LOAD USER STORIES (READ)
 */
async function loadUserStories(uid) {
  storiesList.innerHTML = "<p>Loading your stories...</p>";
  try {
    const q = query(collection(db, "stories"), where("uid", "==", uid), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      storiesList.innerHTML = "<p>No stories submitted yet.</p>";
      return;
    }

    storiesList.innerHTML = ""; // Clear loading message

    querySnapshot.forEach((docSnap) => {
      const storyData = docSnap.data();
      const storyId = docSnap.id;

      // Create story element with update/delete buttons
      const storyEl = document.createElement("div");
      storyEl.classList.add("story-item");
      storyEl.innerHTML = `
        <h4>${storyData.name} (${storyData.email})</h4>
        <p>${storyData.story}</p>
        ${storyData.mediaURL ? `<img src="${storyData.mediaURL}" alt="Media" width="200" />` : ""}
        <small>${storyData.timestamp.toDate().toLocaleString()}</small>
        <br />
        <button class="edit-btn" data-id="${storyId}">Edit</button>
        <button class="delete-btn" data-id="${storyId}">Delete</button>
        <div class="edit-form" style="display:none;">
          <textarea class="edit-story-text" rows="3">${storyData.story}</textarea>
          <button class="save-edit-btn" data-id="${storyId}">Save</button>
          <button class="cancel-edit-btn">Cancel</button>
        </div>
        <hr />
      `;

      storiesList.appendChild(storyEl);

      // Event listeners for edit/delete buttons
      const editBtn = storyEl.querySelector(".edit-btn");
      const deleteBtn = storyEl.querySelector(".delete-btn");
      const editForm = storyEl.querySelector(".edit-form");
      const saveBtn = storyEl.querySelector(".save-edit-btn");
      const cancelBtn = storyEl.querySelector(".cancel-edit-btn");

      editBtn.addEventListener("click", () => {
        editForm.style.display = "block";
        editBtn.style.display = "none";
        deleteBtn.style.display = "none";
      });

      cancelBtn.addEventListener("click", () => {
        editForm.style.display = "none";
        editBtn.style.display = "inline-block";
        deleteBtn.style.display = "inline-block";
      });

      saveBtn.addEventListener("click", async () => {
        const newStoryText = editForm.querySelector(".edit-story-text").value.trim();
        if (!newStoryText) {
          alert("Story cannot be empty.");
          return;
        }
        try {
          await updateDoc(doc(db, "stories", storyId), {
            story: newStoryText,
            timestamp: new Date(),
          });
          await loadUserStories(uid); // Refresh list after update
          feedbackEl.textContent = "Story updated successfully.";
          feedbackEl.style.color = "green";
        } catch (err) {
          console.error(err);
          feedbackEl.textContent = "Failed to update story.";
          feedbackEl.style.color = "red";
        }
      });

      deleteBtn.addEventListener("click", async () => {
        if (confirm("Are you sure you want to delete this story?")) {
          try {
            await deleteDoc(doc(db, "stories", storyId));
            await loadUserStories(uid); // Refresh list after delete
            feedbackEl.textContent = "Story deleted successfully.";
            feedbackEl.style.color = "green";
          } catch (err) {
            console.error(err);
            feedbackEl.textContent = "Failed to delete story.";
            feedbackEl.style.color = "red";
          }
        }
      });
    });
  } catch (error) {
    console.error(error);
    storiesList.innerHTML = "<p>Failed to load stories.</p>";
  }
}

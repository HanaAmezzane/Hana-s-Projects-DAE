import { db, storage } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-storage.js";

let submissionCount = 0;

document.getElementById('storyForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const userName = document.getElementById('name').value.trim();
    const userEmail = document.getElementById('email').value.trim();
    const userStory = document.getElementById('story').value.trim();
    const mediaFile = document.getElementById('media').files[0];

    if (!userName || !userEmail || !userStory) {
        const feedbackEl = document.getElementById('feedbackMessage');
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
            name: userName,
            email: userEmail,
            story: userStory,
            mediaURL: mediaURL,
            timestamp: new Date()
        });

        submissionCount++;
        const feedbackEl = document.getElementById('feedbackMessage');
        feedbackEl.textContent = `Thank you for sharing your story! Total submissions: ${submissionCount}`;
        feedbackEl.style.color = "green";
        document.getElementById('storyForm').reset();

    } catch (error) {
        console.error(error);
        const feedbackEl = document.getElementById('feedbackMessage');
        feedbackEl.textContent = "Error submitting story. Please try again.";
        feedbackEl.style.color = "red";
    }
});


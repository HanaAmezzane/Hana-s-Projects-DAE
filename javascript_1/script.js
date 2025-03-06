let submissionCount = 0;  // Integer variable to track the number of submissions
let userFeedback = "";    // String variable for user feedback message

document.getElementById('storyForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var userName = document.getElementById('name').value;
    var userEmail = document.getElementById('email').value;
    var userStory = document.getElementById('story').value;

    if (userName === '' || userEmail === '' || userStory === '') {
        userFeedback = "Please fill out all fields!";
        document.getElementById('feedbackMessage').textContent = userFeedback;
        document.getElementById('feedbackMessage').style.color = "red";
    } else {
        submissionCount++;
        
        console.log("Story Submission Details:");
        console.log("Name:", userName);
        console.log("Email:", userEmail);
        console.log("Story:", userStory);
        
        userFeedback = "Thank you for sharing your story! Total submissions: " + submissionCount;
        document.getElementById('feedbackMessage').textContent = userFeedback;
        document.getElementById('feedbackMessage').style.color = "green";

        document.getElementById('storyForm').reset();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const API_URL = 'https://api.example.com/stories';
    const API_KEY = 'YOUR_API_KEY';
    
    function fetchStories() {
        fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const storyList = document.getElementById('storyList');
            storyList.innerHTML = '';
    
            if (data.stories && data.stories.length > 0) {
                data.stories.forEach(story => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `Name: ${story.name}, Story: ${story.story}`;
                    storyList.appendChild(listItem);
                });
            } else {
                storyList.innerHTML = "<li>No stories found.</li>";
            }
        })
        .catch(error => {
            console.error('Error fetching stories:', error);
            document.getElementById('feedbackMessage').textContent = "There was an error loading the stories.";
            document.getElementById('feedbackMessage').style.color = "red";
        });
    }
    
    document.getElementById('storyForm').addEventListener('submit', function (event) {
        event.preventDefault();
    
        const userName = document.getElementById('name').value;
        const userEmail = document.getElementById('email').value;
        const userStory = document.getElementById('story').value;
    
        if (!userName || !userEmail || !userStory) {
            document.getElementById('feedbackMessage').textContent = "Please fill out all fields!";
            document.getElementById('feedbackMessage').style.color = "red";
            return;
        }
    
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(userEmail)) {
            document.getElementById('feedbackMessage').textContent = "Please enter a valid email!";
            document.getElementById('feedbackMessage').style.color = "red";
            return;
        }
    
        if (userStory.length < 10) {
            document.getElementById('feedbackMessage').textContent = "Story must be at least 10 characters long!";
            document.getElementById('feedbackMessage').style.color = "red";
            return;
        }
    
        const storyData = {
            name: userName,
            email: userEmail,
            story: userStory
        };
    
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify(storyData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('feedbackMessage').textContent = "Thank you for sharing your story!";
            document.getElementById('feedbackMessage').style.color = "green";
            document.getElementById('storyForm').reset();
            fetchStories();
        })
        .catch(error => {
            console.error('Error submitting story:', error);
            document.getElementById('feedbackMessage').textContent = "There was an error submitting your story.";
            document.getElementById('feedbackMessage').style.color = "red";
        });
    });
    
    fetchStories();
    
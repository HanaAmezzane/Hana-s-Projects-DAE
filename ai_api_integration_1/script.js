document.addEventListener("DOMContentLoaded", function () {
    // Fetch and display recent stories from an API
    function fetchStories() {
        fetch('https://api.example.com/stories')  // Replace with your actual API URL
            .then(response => response.json())
            .then(data => {
                const storyList = document.getElementById('storyList');
                storyList.innerHTML = ''; // Clear existing stories

                data.stories.forEach(story => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `Name: ${story.name}, Story: ${story.story}`;
                    storyList.appendChild(listItem);
                });
            })
            .catch(error => console.error('Error fetching stories:', error));
    }

    // Handle form submission and send data to the API
    document.getElementById('storyForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const userName = document.getElementById('name').value;
        const userEmail = document.getElementById('email').value;
        const userStory = document.getElementById('story').value;

        // Basic validation
        if (!userName || !userEmail || !userStory) {
            document.getElementById('feedbackMessage').textContent = "Please fill out all fields!";
            document.getElementById('feedbackMessage').style.color = "red";
            return;
        }

        const storyData = {
            name: userName,
            email: userEmail,
            story: userStory
        };

        // Send the data to an API
        fetch('https://api.example.com/stories', {  // Replace with your actual API URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(storyData),
        })
            .then(response => response.json())
            .then(data => {
                document.getElementById('feedbackMessage').textContent = "Thank you for sharing your story!";
                document.getElementById('feedbackMessage').style.color = "green";
                document.getElementById('storyForm').reset();
                fetchStories(); // Refresh the stories list after submission
            })
            .catch(error => {
                document.getElementById('feedbackMessage').textContent = "There was an error submitting your story.";
                document.getElementById('feedbackMessage').style.color = "red";
            });
    });

    // Initial fetch to display stories
    fetchStories();
});

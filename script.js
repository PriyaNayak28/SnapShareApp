
async function createPost(event) {
    try {
        event.preventDefault();

        let imageUrl = event.target.imageUrl.value;
        let description = event.target.description.value;

        let post = {
            imageUrl,
            description
        };

        // Correct endpoint for adding a new post
        const response = await axios.post("http://localhost:4000/post/add-post", post);
        uploadPost(response.data);

        // Clear input fields after successful submission
        event.target.imageUrl.value = '';
        event.target.description.value = '';

        console.log(response);
    } catch (err) {
        console.error('Error:', err.message);
    }
};

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await axios.get("http://localhost:4000/post/posts");
        console.log(response);

        for (var i = 0; i < response.data.length; i++) {
            uploadPost(response.data[i]);
        }
    } catch (error) {
        console.log('Error:', error.message);
    }
});

function PostComment(childElement, commentInput, sendButton, commentButton, commentText) {
    const commentElement = document.createElement('p');
    commentElement.textContent = `Anonymous: ${commentText}`;

    // Check if the commentButton is already added to the childElement
    if (commentButton.parentNode === childElement) {
        // Insert the new comment before the commentButton
        childElement.insertBefore(commentElement, commentButton);
    } else {
        // If the commentButton is not part of childElement yet, just append the comment
        childElement.appendChild(commentElement);
    }

    // Clear input field
    commentInput.value = '';
    // Hide the input field and send button
    commentInput.style.display = 'none';
    sendButton.style.display = 'none';
    // Show the comment button again
    commentButton.style.display = 'block';

}

async function uploadPost(post) {
    const parentElement = document.getElementById('posts');
    const childElement = document.createElement('li');
    childElement.classList.add('post'); // Added class for styling

    childElement.innerHTML = `<img src="${post.imageUrl}" alt="Image"> <br> Description: ${post.description} <br>`;

    const commentButton = document.createElement('button');
    commentButton.textContent = 'Comment'; // Change button text to "Comment"
    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = 'Type your comment';
    commentInput.style.display = 'none'; // Initially hide the comment input field
    const sendButton = document.createElement('button');
    sendButton.textContent = 'Send'; // Create a send button
    sendButton.style.display = 'none'; // Initially hide the send button

    if (post.comment) {
        const strComments = post.comment
        const array = strComments.split('\n');


        for (let comment of array) {
            PostComment(childElement, commentInput, sendButton, commentButton, comment)
        }


    }

    commentButton.addEventListener('click', () => {
        if (commentInput.style.display === 'none') {
            commentInput.style.display = 'block';
            sendButton.style.display = 'block';
            commentButton.style.display = 'none'; // Hide the comment button when input field is shown
        }
    });

    sendButton.addEventListener('click', async () => {
        try {
            const commentText = commentInput.value;
            // Send comment to server
            await axios.patch(`http://localhost:4000/post/add-comment/${post.id}`, { comment: commentText });

            PostComment(childElement, commentInput, sendButton, commentButton, commentText)

        } catch (error) {
            console.log('Error adding comment:', error.message);
        }
    });

    childElement.appendChild(commentButton);
    childElement.appendChild(commentInput);
    childElement.appendChild(sendButton);

    parentElement.appendChild(childElement);
}
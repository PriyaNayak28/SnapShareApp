
const Post = require('../models/post');
const path = require('path');

exports.getPosts = async (req, res, next) => {
    try {
        const posts = await Post.findAll();
        console.log(posts);
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAddPost = (req, res, next) => {
    const filePath = path.join(__dirname, '../index.html');
    res.sendFile(filePath);
};

exports.uploadPost = async (req, res, next) => {
    const { imageUrl, description, comment } = req.body;

    try {
        const post = await Post.create({
            imageUrl,
            description,
            comment // Save the comment directly in the post
        });

        res.json(post);
    } catch (error) {
        console.error('Error uploading post:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.addComment = async (req, res, next) => {
    const postId = req.params.id;
    const newComment = req.body.comment;

    try {
        // Find the post by ID
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Retrieve existing comments and append the new comment
        const existingComments = post.comment || ''; // Initialize as an empty string
        const updatedComments = existingComments ? `${existingComments}\n${newComment}` : newComment;

        // Update the post with the updated comments
        await post.update({ comment: updatedComments });

        // Send success response
        res.status(200).json({ message: 'Comment added successfully' });
    } catch (error) {
        console.error('Error adding comment:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



exports.getComments = async (req, res, next) => {
    const postId = req.params.id;

    try {
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Retrieve comments directly from the post attribute
        const comments = post.comment ? [post.comment] : []; // Assuming comment is an array
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



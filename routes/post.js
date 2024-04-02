const express = require('express');

const router = express.Router();
const postController = require('../controllers/post');
const Post = require('../models/post');

router.get('/posts', postController.getPosts);

router.get('/add-post', postController.getAddPost);

router.post('/add-post', postController.uploadPost);

router.get('/comments/:id', postController.getComments);

router.patch('/add-comment/:id', postController.addComment);

module.exports = router;


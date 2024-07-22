const express = require('express')

const router = express.Router();

const { createPost, readPost, readPosts, updatePost, deletePost } = require('../controllers/post.js');

router.post('/post', createPost);
router.get('/posts', readPosts);
router.get('/post/:id', readPost);
router.put('/post/:id', updatePost);
router.delete('/post/:id', deletePost);

module.exports = router;
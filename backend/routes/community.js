const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Get all community posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json({ success: true, posts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch posts' });
    }
});

// Create a new post
router.post('/posts', async (req, res) => {
    try {
        const { user, role, content } = req.body;

        if (!user || !content) {
            return res.status(400).json({ success: false, error: 'User and content are required' });
        }

        const post = new Post({
            user,
            role: role || 'Farmer',
            content,
            likes: 0,
            replies: 0,
        });

        await post.save();
        res.status(201).json({ success: true, post });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ success: false, error: 'Failed to create post' });
    }
});

// Like a post
router.post('/posts/:id/like', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ success: false, error: 'Post not found' });
        }

        post.likes += 1;
        await post.save();

        res.json({ success: true, post });
    } catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({ success: false, error: 'Failed to like post' });
    }
});

module.exports = router;

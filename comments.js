// Create web server
// 1. Create a web server
// 2. Create a router
// 3. Create a route
// 4. Send response

const express = require('express');
const router = express.Router();
const comments = require('../data/comments');

// Get all comments
router.get('/', (req, res) => {
    res.json(comments);
});

// Get single comment
router.get('/:id', (req, res) => {
    const found = comments.some(comment => comment.id === parseInt(req.params.id));

    if (found) {
        res.json(comments.filter(comment => comment.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No comment with the id of ${req.params.id}` });
    }
});

// Create comment
router.post('/', (req, res) => {
    const newComment = {
        id: req.body.id,
        text: req.body.text
    };

    if (!newComment.id || !newComment.text) {
        return res.status(400).json({ msg: 'Please include a comment id and text' });
    }

    comments.push(newComment);
    res.json(comments);
});

// Update comment
router.put('/:id', (req, res) => {
    const found = comments.some(comment => comment.id === parseInt(req.params.id));

    if (found) {
        const updComment = req.body;
        comments.forEach(comment => {
            if (comment.id === parseInt(req.params.id)) {
                comment.id = updComment.id ? updComment.id : comment.id;
                comment.text = updComment.text ? updComment.text : comment.text;

                res.json({ msg: 'Comment updated', comment });
            }
        });
    } else {
        res.status(400).json({ msg: `No comment with the id of ${req.params.id}` });
    }
});

// Delete comment
router.delete('/:id', (req, res) => {
    const found = comments.some(comment => comment.id === parseInt(req.params.id));

    if (found) {
        res.json({
            msg: 'Comment deleted',
            comments: comments.filter(comment => comment.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({ msg: `No comment with the id of ${req.params.id}` });
    }
});

module.exports = router;
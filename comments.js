// Create web server
var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var Post = require('../models/post');
var User = require('../models/user');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

// get all comments
router.get('/', function(req, res) {
    Comment.find(function(err, comments) {
        if (err) {
            res.send(err);
        }
        res.json(comments);
    });
});

// get all comments of a post
router.get('/:post_id', function(req, res) {
    Comment.find({
        post_id: req.params.post_id
    }, function(err, comments) {
        if (err) {
            res.send(err);
        }
        res.json(comments);
    });
});

// create a new comment
router.post('/', function(req, res) {
    var token = req.body.token;
    var decoded = jwt.decode(token);
    var comment = new Comment({
        post_id: req.body.post_id,
        user_id: decoded._id,
        content: req.body.content,
        created_at: Date.now()
    });
    comment.save(function(err, comment) {
        if (err) {
            res.send(err);
        }
        res.json(comment);
    });
});

// delete a comment
router.delete('/:comment_id', function(req, res) {
    Comment.remove({
        _id: req.params.comment_id
    }, function(err, comment) {
        if (err) {
            res.send(err);
        }
        res.json(comment);
    });
});

module.exports = router;


const express = require('express');
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware');
const Post = require('../models/Post')


//Add new post
router.post('/', authMiddleware, (req, res) => {
    let newPost = new Post({...req.body, owner : req.userId})
    newPost.save()
        .then(post => res.status(201).send({msg : "New post added successfully"}))
        .catch(err => {
            console.log(err)
            res.status(500).send({msg : "Server error"})
        })
})

//Get all post
router.get('/', authMiddleware, (req, res) => {
    Post.find()
        .then(posts => res.send(posts))
        .catch(err => {
            console.log(err)
            res.status(500).send({ msg : 'Server error'})
        })
})

//Get user post
router.get('/myPost', authMiddleware, (req, res) => {
    Post.find({owner : req.userId})
        .then(posts => res.send(posts))
        .catch(err => {
            console.log(err)
            res.status(500).send({ msg : 'Server error'})
        })
})

module.exports = router

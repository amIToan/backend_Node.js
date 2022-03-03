const express = require('express')
const router = express.Router();
const Post = require('../models/Post')
const authToken = require('../middleware/confirm')
// route for post api/post
// Create post
// access rive

router.post('/usersPost', authToken, async (req, res) => {
    const {
        title,
        description,
        url,
        status
    } = req.body;
    // simple validate
    if (!title) return res.status(400).json({
        success: false,
        message: 'required Title!!! '
    });
    try {
        const newPost = new Post({
            title,
            description,
            url: url.startsWith('https://') ? url : `https://${url}`,
            status: status || 'TO LEARN',
            user: req.userId,
        })
        await newPost.save();
        res.json({
            success: true,
            message: 'Ok! Success',
            post: newPost
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})

// get posts
router.get('/', authToken, async (req, res) => {
    try {
        const posts = await Post.find({
            user: req.userId
        }).populate('user', ['username']);
        res.json({
            success: true,
            posts
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})
// route for update
router.put('/:id', authToken, async(req,res) => {
    const {
        title,
        description,
        url,
        status
    } = req.body;
    // simple validate
    if (!title) return res.status(400).json({
        success: false,
        message: 'required Title!!! '
    });
    try {
        let updatedPost = {
            title,
            description : description || '',
            url: (url.startsWith('https://') ? url : `https://${url}`) || '',
            status: status || 'TO LEARN',
            user: req.userId,
        }
        const updatedCOndition = {_id : req.params.id, user : req.userId};
        updatedPost = await Post.findOneAndUpdate(updatedCOndition, updatedPost, {new : true})
        if (!updatedCOndition) {
            return res.status(401).json({
                success: false,
                message: `It's not authorized !!!`,
            })
        }
        res.json({
            success: true,
            message: 'Ok! Successful Updating',
            newPost: updatedPost
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})

// route for deleting
router.delete('/:id', authToken, async(req,res) => {

    try {
        const deleteCOndition = {_id : req.params.id, user : req.userId};
        deletedPost = await Post.findByIdAndDelete(deleteCOndition)
        if (!deletedPost) {
            return res.status(401).json({
                success: false,
                message: `It's not delete !!!`,
            })
        }
        res.json({
            success: true,
            message: 'Ok! Successful Deleting',
            deletePost: deletedPost
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})
module.exports = router;
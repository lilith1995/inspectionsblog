const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/newpost', (req, res) => {
    res.render('posts/newpost', { post: new Post() })
});

router.get('/edit/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('posts/edit', { post: post })

});

router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    if (post == null) res.redirect('/')
    res.render('posts/singlepost', { post: post })

});

router.post('/', async (req, res, next) => {
    req.post = new Post()
    next()
}, savePostAndRedirect('newpost'));

router.put('/:id', async (req, res, next) => {
  req.post = await Post.findById(req.params.id)
  next()
}, savePostAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/')
});

function savePostAndRedirect(path) {
    return async (req, res) => {
        let post = req.post
        post.place = req.body.place
        post.result = req.body.result
        post.city = req.body.city
    try {
        post = await post.save()
        res.redirect(`/posts/${post.id}`)
    } catch (e) {
        res.render(`posts/${path}`, { post: post })
    }
    }
}

module.exports = router;




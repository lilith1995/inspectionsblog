const express = require('express');
const mongoose = require('mongoose');
const postsRouter = require('./routes/posts');
const Post = require('./models/post');
const methodOverride = require('method-override');

const app = express();

const db ='mongodb+srv://lilifer:QvqVBfOsiEmoKvH8@cluster0.iepzd.mongodb.net/inspections?retryWrites=true&w=majority';
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log('Connected to DB'))
    .catch((error) => console.log(error));

app.set('view engine', 'ejs');
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }));


app.get('/', async (req, res) => {
    const posts = await Post.find().sort({ createdAt: "desc"})
    res.render('posts/index', {posts: posts});
});

app.use('/posts', postsRouter);

app.listen(3000, ()=> console.log('Server is running'));
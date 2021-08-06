const Blog = require('../models/blog');

const getBlogsController = (req, res) => {
  Blog.find().sort({ createdAt: -1 }).then(result => {
    res.render('index', { title: 'Home', blogs: result });
  }).catch(error => {
    console.log(error);
  })
};

const saveBlogController = (req, res) => {
  const { title, snippet, body } = req.body;
  const blog = new Blog({
    title: title,
    snippet: snippet,
    body: body
  });
  blog.save().then(() => {
    res.redirect('/');
  }).catch(error => {
    console.log(error);
  })
};

const createBlogPageController = (req, res) => {
  res.render('create', { title: 'Create a new blog' });
};

const getBlogByIdController = (req, res) => {
  Blog.findById(req.params.id).then(result => {
    // console.log(result);
    res.render('details', { title: result.title, blog: result })
  }).catch(error => {
    res.status(404).render('404', {title:'Blog Not Found!'})
  })
};

const deleteBlogController = (req, res) => {
  Blog.findByIdAndDelete(req.params.id).then(result => {
    console.log('Blog Deleted!!!');
    res.json({ redirect: '/blogs' })
  }).catch(error => {
    console.log(error);
  })
};


module.exports = {
  getBlogsController,
  saveBlogController,
  createBlogPageController,
  getBlogByIdController,
  deleteBlogController
}
const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');

// Blog Routes
router.get('/', blogController.getBlogsController);

router.post('/', blogController.saveBlogController);

router.get('/create', blogController.createBlogPageController);

router.get('/:id', blogController.getBlogByIdController)

router.delete('/:id', blogController.deleteBlogController)

module.exports = router;
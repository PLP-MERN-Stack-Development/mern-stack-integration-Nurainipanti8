const Post = require('../models/Post');
const AppError = require('../utils/AppError'); // Custom error utility

// GET /api/posts
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({
      status: 'success',
      results: posts.length,
      data: { posts },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/posts/:id
exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return next(new AppError('No post found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { post },
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/posts
// Add authentication middleware before this in Task 5
exports.createPost = async (req, res, next) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { post: newPost },
    });
  } catch (err) {
    next(err);
  }
};

// PUT /api/posts/:id
// Add authorization middleware before this in Task 5
exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true,
    });

    if (!post) {
      return next(new AppError('No post found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { post },
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/posts/:id
// Add authorization middleware before this in Task 5
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return next(new AppError('No post found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
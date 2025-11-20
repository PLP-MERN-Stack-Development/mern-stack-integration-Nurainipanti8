// server/routes/postRoutes.js (Updated)
const express = require('express');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController'); // New Import
const router = express.Router();

router.use(authController.protect); // All routes below this line are protected (optional, use it only where needed)

router
  .route('/')
  .get(postController.getAllPosts) // GET routes are often public, so maybe keep this one *above* the router.use(protect)
  .post(authController.protect, postController.createPost); // PROTECTED

router
  .route('/:id')
  .get(postController.getPost) // GET routes are often public
  .put(authController.protect, postController.updatePost) // PROTECTED
  .delete(authController.protect, postController.deletePost); // PROTECTED

module.exports = router;
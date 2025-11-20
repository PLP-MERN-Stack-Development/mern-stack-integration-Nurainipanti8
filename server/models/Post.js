const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  // Relationship: References the Category model
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: true,
  },
  // Added for Task 5: User Authentication
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: { type: Date, default: Date.now },
});

// Auto-populate Category data on find queries
postSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'category',
        select: 'name slug' 
    });
    // Add author population for Task 5
    // this.populate({
    //     path: 'author',
    //     select: 'username'
    // });
    next();
});

module.exports = mongoose.model('Post', postSchema);
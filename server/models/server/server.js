// server/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// 1. Database Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connection successful!'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(cors({
    origin: process.env.ALLOWED_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));



app.get("/", (req, res) => res.send("blog API is up and running..."));
app.use("/api/blog", BlobRouter);



// 2. Middleware
app.use(cors()); // Configure CORS as needed
app.use(express.json()); // Body parser for JSON data

// 3. API Routes
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);

// 4. Global Error Handler (Must be the last middleware)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
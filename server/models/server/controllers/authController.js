// server/controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const { promisify } = require('util'); // For converting jwt.verify to async/await
// Other imports needed for the file: jwt, User, AppError

// Helper function to create and send JWT
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Remove password from output before sending response
  user.password = undefined; 

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

// POST /api/auth/register
exports.register = async (req, res, next) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    createSendToken(newUser, 201, res);
  } catch (err) {
    if (err.code === 11000) {
        // MongoDB duplicate key error (for unique fields like email/username)
        return next(new AppError('User with this email or username already exists.', 400));
    }
    next(err);
  }
};

// POST /api/auth/login
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  // 2. Check if user exists AND password is correct
  const user = await User.findOne({ email }).select('+password');
  
  // Use the instance method defined in the model
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password.', 401));
  }

  // 3. If everything is OK, send token to client
  createSendToken(user, 200, res);
};
// ... (inside server/controllers/authController.js)


// Middleware to protect routes
// GET /api/posts - becomes protected when this is added to the route handler
exports.protect = async (req, res, next) => {
  let token;
  // 1. Getting token and check if it's there
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2. Verification token
  // promisify converts the callback-based jwt.verify into a promise
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3. Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token no longer exists.', 401)
    );
  }

  // 4. Grant access to protected route (store user object on the request)
  req.user = currentUser;
  next();
};
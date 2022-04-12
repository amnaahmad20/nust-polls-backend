import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Admin from '../models/admin.js';

//PROTECT MIDDLEWARE

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(decoded._id).select('-password');
      next();
    } catch (err) {
      res.status(401).json({
        message: 'Not authorized, Token failed',
        success: false,
      });
    }
  }
  if (!token) {
    res.status(401).json({
      message: 'Not authorized, No token',
      success: false,
    });
  }
};

//ADMIN MIDDLEWARE

const admin = async (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    const title = (await Admin.findOne({ admin: req.user._id })).title;
    req.user = { ...req.user.toObject(), title };
    next();
  } else {
    res.status(401).json({
      message: 'Not authorized as admin',
      success: false,
    });
  }
};

//STUDENT MIDDLEWARE

const student = (req, res, next) => {
  if (req.user && req.user.role === 'student') {
    next();
  } else {
    res.status(401).json({
      message: 'Not authorized to access this route',
      success: false,
    });
  }
};

export { protect, admin, student };

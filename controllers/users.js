import passport from 'passport';
import jwt from 'jseonwebtoken';
import crypto from 'crypto';
import User from '../models/user.js';
import Admin from '../models/admin.js';
import Student from '../models/student.js';
import sendEmail from '../utils/sendEmail.js';

const loginUser = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      res.status(500).json({ message: info.message, success: false });
    } else {
      const { password, ..._user } = user.toObject();
      const token = jwt.sign(_user, process.env.JWT_SECRET_KEY);
      let response = { data: _user, token, message: 'Login successful', success: true };
      if (user.role == 'admin') {
        Admin.findOne({ admin: user._id })
          .populate('user')
          .exec()
          .then((data) => {
            if (!data) return Promise.reject(new Error('Admin does not exist'));
            res.status(200).json({ ...response, data: data });
          })
          .catch((err) => {
            res.status(500).json({ message: err.message, success: false });
          });
      } else if (user.role == 'student') {
        Student.findOne({ student: user._id })
          .populate('user')
          .exec()
          .then((data) => {
            if (!data) return Promise.reject(new Error('Student does not exist'));
            res.status(200).json({ ...response, data: data});
          })
          .catch((err) => {
            res.status(500).json({ message: err.message, success: false });
          });
      } else {
        res.status(500).json({
          message: 'User does not exist',
          success: false,
        });
      }
    }
  })(req, res, next);
};

const forgotPassword = () => {};

const resetPassword = () => {};

export { loginUser, forgotPassword, resetPassword };

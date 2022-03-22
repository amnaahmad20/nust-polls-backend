import passport from 'passport';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/user.js';
import Admin from '../models/admin.js';
import Student from '../models/student.js';
import sendEmail from '../utils/sendEmail.js';

//LOGIN CONTROLLER

const loginUser = (req, res, next) => {
  passport.authenticate(
    'local',
    { session: false },
    async (err, user, info) => {
      if (err || !user) {
        res.status(500).json({ message: info.message, success: false });
      } else {
        const { password, ..._user } = user.toObject();
        const token = jwt.sign(_user, process.env.JWT_SECRET_KEY);
        let response = {
          data: _user,
          token,
          message: 'Login successful',
          success: true,
        };
        if (user.role == 'admin') {
          try {
            const data = await Admin.findOne({ admin: user._id })
              .populate('admin', '-password')
              .exec();
            if (!data)
              res
                .status(404)
                .json({ message: 'Admin does not exist', success: false });
            res.status(200).json({ ...response, data: data });
          } catch (err) {
            res.status(500).json({ message: err.message, success: false });
          }
        } else if (user.role == 'student') {
          try {
            const data = await Student.findOne({ student: user._id })
              .populate('student', '-password')
              .exec();
            if (!data)
              res
                .status(404)
                .json({ message: 'Student does not exist', success: false });
            res.status(200).json({ ...response, data: data });
          } catch (err) {
            res.status(500).json({ message: err.message, success: false });
          }
        } else {
          res.status(500).json({
            message: 'User does not exist',
            success: false,
          });
        }
      }
    }
  )(req, res, next);
};

//FORGOT PASSWORD CONTROLLER

const forgotPassword = () => {};

//RESET PASSWORD CONTROLLER

const resetPassword = () => {};

export { loginUser, forgotPassword, resetPassword };

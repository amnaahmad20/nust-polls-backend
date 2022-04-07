import express from 'express';
import {
  loginUser,
  forgotPassword,
  resetPassword,
} from '../controllers/users.js';

// import { protect, admin } from '../middlewares/auth.js';

const router = express.Router({ mergeParams: true });

//LOGIN ROUTE
/**
 * @route   POST /user/login
 * @desc    Login user with username and password
 * @body    {username, password}
 */
router.post('/login', loginUser);

//FORGOT PASSWORD ROUTE
/**
 * @route   POST /user/forgotpassword
 * @desc    Forgot password, send email to reset
 * @body    {email}
 */
router.post('/forgotpassword', forgotPassword);

//RESET PASSWORD ROUTE
/**
 * @route   PUT /user/resetpassword
 * @desc    Reset password after forgot
 * @body    {password}
 */
router.put('/resetpassword/:resetToken', resetPassword);

//MIDDLEWARE TEST ROUTE
// router.get('/index', protect, admin, (req, res) => {
//   res.status(200).json({
//     message: 'Success',
//     success: true,
//   });
// });

export default router;

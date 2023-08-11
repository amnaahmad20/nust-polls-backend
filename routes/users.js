import express from 'express';
import {
  loginUser,
  forgotPassword,
  resetPassword,
  registerUser,
} from '../controllers/users.js';
// import { protect } from '../middlewares/auth.js';

// import { protect, admin } from '../middlewares/auth.js';
// import { userSubgroups, pollAudience } from '../middlewares/userGroups.js';

const router = express.Router({ mergeParams: true });

//LOGIN ROUTE
/**
 * @route    POST /user/register
 * @desc     register user with username password and role
 * @body     {username, password,role}, both should be non empty
 * @returns  response with user information and token in case of success (200)
 *           and error message in case of failure (404 or 500)
 */
router.post('/register', registerUser);

//LOGIN ROUTE
/**
 * @route    POST /user/login
 * @desc     Login user with username and password
 * @body     {username, password}, both should be non empty
 * @returns  response with user information and token in case of success (200)
 *           and error message in case of failure (404 or 500)
 */
router.post('/login', loginUser);

//FORGOT PASSWORD ROUTE
/**
 * @route    POST /user/forgotpassword
 * @desc     Forgot password, send email to reset
 * @body     {email}, email should be associated with a registered user
 * @returns  email sent to user and response with success message in case of
 *           success (200) and error message in case of failure (404)
 */
router.post('/forgotpassword', forgotPassword);

//RESET PASSWORD ROUTE
/**
 * @route    PUT /user/resetpassword
 * @desc     Reset password after forgot
 * @body     {password}, password should have minimum 8 characters
 * @returns  response with success message in case of success (200) and error
 *           message in case of failure (201 or 400)
 */
router.put('/resetpassword/:resetToken', resetPassword);

//MIDDLEWARE TEST ROUTEs

// router.get('/index',  protect, (req, res) => {
//   res.status(200).json({
//      message: 'Success',
//      success: true,
//      data: req.subgroups,
//    });
//  });

// router.post('/index2', protect, admin, pollAudience, (req, res) => {
//   res.status(200).json({
//     message: 'Success',
//     success: true,
//     data: req.audience,
//   });
// });

export default router;

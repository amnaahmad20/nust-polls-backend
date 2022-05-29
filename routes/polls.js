import express from 'express';
import {
  getPolls,
  createPoll,
  editPoll,
  deletePoll,
  editPollQues,
  populatePoll,
  getDetails,
  getQues,
  createResponse,
  getStudentPolls,
  addStudentResponse,
} from '../controllers/polls.js';
import { protect, admin, student } from '../middlewares/auth.js';

const pollRoutes = express.Router({ mergeParams: true });

//GET ADMIN POLLS ROUTE
/**
 * @route
 * @desc
 * @body
 * @returns
 */
pollRoutes.get('/polls/:adminId', protect, admin, getPolls);

//CREATE POLL ROUTE
/**
 * @route
 * @desc
 * @body
 * @returns
 */
pollRoutes.post('/polls/create', protect, admin, createPoll);

//POPULATE POLL ROUTE
/**
 * @route
 * @desc
 * @body
 * @returns
 */
pollRoutes.post('/polls/populate', protect, admin, populatePoll);

//EDIT POLL ROUTE
/**
 * @route
 * @desc
 * @body
 * @returns
 */
pollRoutes.post('/polls/edit/:id', protect, admin, editPoll);

//EDIT POLL QUESTION ROUTE
/**
 * @route
 * @desc
 * @body
 * @returns
 */
pollRoutes.post('/polls/edit-ques/:id', protect, admin, editPollQues);

//FINALIZE POLL ROUTE
/**
 * @route
 * @desc
 * @body
 * @returns
 */
pollRoutes.get('/polls/finalize/:id', protect, admin, createResponse);

//GET POLL DETAILS ROUTE
/**
 * @route
 * @desc
 * @body
 * @returns
 */
pollRoutes.get('/polls/details/:id', protect, admin, getDetails);

//GET STUDENT POLLS ROUTE
/**
 * @route
 * @desc
 * @body
 * @returns
 */
pollRoutes.get('/polls/student', protect, student, getStudentPolls);

//GET QUESTIONS ROUTE
/**
 * @route
 * @desc
 * @body
 * @returns
 */
pollRoutes.get('/polls/ques/:id', protect, student, getQues);

//ADD STUDENT RESPONSE ROUTE
/**
 * @route
 * @desc
 * @body
 * @returns
 */
pollRoutes.post(
  '/polls/student/response/:pollId',
  protect,
  student,
  addStudentResponse
);

//DELETE POLL ROUTE
/**
 * @route
 * @desc
 * @body
 * @returns
 */
pollRoutes.delete('/polls/delete/:id', protect, admin, deletePoll);

export default pollRoutes;

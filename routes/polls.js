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

//GET STUDENT POLLS ROUTE
/**
 * @route GET /polls/student
 * @desc Get the polls for a specific student
 * @body none
 * @returns the student polls in case of
 *           success (200) and error message in case of failure (404)
 */
pollRoutes.get('/polls/student', protect, student, getStudentPolls);

//CREATE POLL ROUTE
/**
 * @route    POST /polls/create
 * @desc     Creates a poll instance
 * @body     none
 * @returns  response with details of the newly created default poll of the admin in case of
 *           success (200) and error message in case of failure (404)
 */
pollRoutes.post('/polls/create', protect, admin, createPoll);

//POPULATE POLL ROUTE
/**
 * @route  POST /polls/populate
 * @desc Populates a newly created poll with questions
 * @body {poll}
 * @returns response with success message in case of
 *           success (200) and error message in case of failure (404)
 */
pollRoutes.post('/polls/populate', protect, admin, populatePoll);

//EDIT POLL ROUTE
/**
 * @route POST /polls/edit/:id
 * @desc Edits the existing poll
 * @body {...poll_key:value}
 * @returns response with success message in case of
 *           success (200) and error message in case of failure (404)
 */
pollRoutes.post('/polls/edit/:id', protect, admin, editPoll);

//EDIT POLL QUESTION ROUTE
/**
 * @route POST /polls/edit-ques/:id
 * @desc Updates the poll question object
 * @body {...poll_key:value}
 * @returns response with success message in case of
 *           success (200) and error message in case of failure (404)
 */
pollRoutes.post('/polls/edit-ques/:id', protect, admin, editPollQues);

//GET ADMIN POLLS ROUTE
/**
 * @route    GET /polls/:adminId
 * @desc     Viewing polls of a specific admin
 * @body     none, add adminId in route params
 * @returns  response with poll details of the admin in case of
 *           success (200) and error message in case of failure (404)
 */
pollRoutes.get('/polls/:adminId', protect, admin, getPolls);

//GET POLL DETAILS ROUTE
/**
 * @route GET /polls/details/:id
 * @desc Get details and reponses of the poll
 * @body none
 * @returns The questions and responses object for the specified poll in case of
 *           success (200) and error message in case of failure (404)
 */
pollRoutes.get('/polls/details/:id', protect, admin, getDetails);

//FINALIZE POLL ROUTE
/**
 * @route GET /polls/finalize/:id
 * @desc Publish the poll by creating a response object for it in the DB
 * @body none, poll id as route param
 * @returns response with success message in case of
 *           success (200) and error message in case of failure (404)
 */
pollRoutes.get('/polls/finalize/:id', protect, admin, createResponse);

//GET QUESTIONS ROUTE
/**
 * @route GET /polls/ques/:id
 * @desc Returns the poll questions object for a specific poll
 * @body none, just add poll id in the route params
 * @returns returns the poll questions object for a poll in case of
 *           success (200) and error message in case of failure (404)
 */
pollRoutes.get('/polls/ques/:id', protect, getQues);

//ADD STUDENT RESPONSE ROUTE
/**
 * @route POST /polls/student/response/:pollId
 * @desc Saves the student response for a given poll
 * @body {...pollResponse key:value}
 * @returns response with success message in case of
 *           success (200) and error message in case of failure (404)
 */
pollRoutes.post(
  '/polls/student/response/:pollId',
  protect,
  student,
  addStudentResponse
);

//DELETE POLL ROUTE
/**
 * @route POST /polls/delete/:id
 * @desc Deletes the specific poll
 * @body none, add poll id in route params
 * @returns response with success message in case of
 *           success (200) and error message in case of failure (404)
 */
pollRoutes.delete('/polls/delete/:id', protect, admin, deletePoll);

export default pollRoutes;

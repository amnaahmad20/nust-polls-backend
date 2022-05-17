import express from 'express';
import { getPolls, createPoll, editPoll, deletePoll, editPollQues, populatePoll, getDetails } from '../controllers/polls.js';
import { protect, admin } from '../middlewares/auth.js';


const pollRoutes = express.Router({ mergeParams: true });


pollRoutes.post('/polls/create', protect, admin, createPoll);

pollRoutes.post('/polls/edit/:id', protect, admin, editPoll);

pollRoutes.post('/polls/delete/:id', protect, admin, deletePoll);

pollRoutes.post('/polls/edit-ques/:id', protect, admin, editPollQues);

pollRoutes.post('/polls/populate', protect, admin, populatePoll)

pollRoutes.get('/polls/:adminId', protect, admin, getPolls);

pollRoutes.get('/polls/details/:id', protect, admin, getDetails)


export default pollRoutes;

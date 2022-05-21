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
    addStudentResponse
} from '../controllers/polls.js';
import { protect, admin, student } from '../middlewares/auth.js';


const pollRoutes = express.Router({ mergeParams: true });


pollRoutes.post('/polls/create', protect, admin, createPoll);

pollRoutes.post('/polls/edit/:id', protect, admin, editPoll);

pollRoutes.delete('/polls/delete/:id', protect, admin, deletePoll);

pollRoutes.post('/polls/edit-ques/:id', protect, admin, editPollQues);

pollRoutes.post('/polls/populate', protect, admin, populatePoll)

pollRoutes.get('/polls/student', protect, student, getStudentPolls)

pollRoutes.post('/polls/student/response/:pollId', protect, student, addStudentResponse)

pollRoutes.get('/polls/:adminId', protect, admin, getPolls);

pollRoutes.get('/polls/details/:id', protect, admin, getDetails)

pollRoutes.get('/polls/finalize/:id', protect, admin, createResponse)

pollRoutes.get('/polls/ques/:id', protect, getQues)




export default pollRoutes;

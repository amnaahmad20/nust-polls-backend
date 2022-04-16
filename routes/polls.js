import express from 'express';
import { getPolls, createPoll, editPoll } from '../controllers/polls.js';

const pollRoutes = express.Router({ mergeParams: true });

pollRoutes.get('/polls/:adminId', getPolls);

pollRoutes.post('/polls/create', createPoll);

pollRoutes.post('/polls/edit/:id', editPoll);

export default pollRoutes;

import express from "express";
import { getPolls, createPoll } from "../controllers/polls.js";


const pollRoutes = express.Router({ mergeParams: true });


pollRoutes.get("/polls/:adminId", getPolls);

pollRoutes.post("/polls/create", createPoll)



export default pollRoutes;

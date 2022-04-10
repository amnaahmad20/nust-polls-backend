import express from "express";
import Poll from '../models/poll.js'
import mongoose from 'mongoose';


const router = express.Router({ mergeParams: true });


router.get("/polls", async (request, response) => {
    const connectionString = "mongodb+srv://admin:admin@cluster0.mdp53.mongodb.net/nust-polls?retryWrites=true&w=majority"
    const connector = mongoose.connect(connectionString)
    let polls = await connector.then(async () => {
        return await Poll.find({}); 
    })
  
    try {
      response.send(polls);
    } 
    catch (error) {
      response.status(500).send(error);
    }
  });


export default router;

import Poll from '../models/poll.js';
import PollQues from '../models/poll-questions.js';
import Admin from '../models/admin.js'
import pollResponse from '../models/response.js';
import mongoose from 'mongoose';
import { request } from 'express';


const getPolls = async (request, response) => {
  console.log(request.params);
  var ObjectId = mongoose.Types.ObjectId;
  let polls = await Poll.find({ admin: new ObjectId(request.params.adminId) });

  try {
    response.send(polls);
  } catch (error) {
    console.log('Failure');
    response.status(500).send(error);
  }

  
};

const getDetails = async (request, response) => {
    var ObjectId = mongoose.Types.ObjectId;
    let ques = await PollQues.find( {poll: new ObjectId(request.params.id)} );
    let resp = await pollResponse.find( {poll: new ObjectId(request.params.id)} )
    var details = { questions:ques, responses:resp }
    try {
      response.send(details);
    } 
    catch (error) {
      console.log('Failure');
      response.status(500).send(error);
    }


}



const editPoll = async (request, response) => {


  try {
    console.log(request.body);
    await Poll.findByIdAndUpdate(request.params.id, request.body);
    response.send('Done');
  } catch (error) {
    response.status(500).send(error);
  }


};




const createPoll = async (request, response) => {
   var ObjectId = mongoose.Types.ObjectId;
   
   var newPoll = await Poll.create({
      admin: new ObjectId(request.body.admin),
      poll_name: request.body.poll_name,
      description: request.body.description,
      deadline: request.body.deadline,
      created_on: request.body.created_on
    });

  response.send(newPoll);
};



const populatePoll = async (request, response) => {
  try{

    await PollQues.create(
      request.body
    )
    
    response.send("Done")

  } catch(err){

    console.log(err)
    response.status(500).send(error);    

  }


}

export { getPolls, createPoll, editPoll, populatePoll, getDetails };

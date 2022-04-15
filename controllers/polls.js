import Poll from "../models/poll.js"
import mongoose from 'mongoose';





const getPolls = async (request, response) => {


    console.log(request.params)
    let polls = async () => {
        var ObjectId = mongoose.Types.ObjectId; 
        return await Poll.find({ admin:new ObjectId(request.params.adminId )}); 
    }
  
    try {
      response.send(polls);
    } 
    catch (error) {
      console.log("Done")
      response.status(500).send(error);
    }

  };



  
  const createPoll = async (request, response) => {


  
    async () => {
          var ObjectId = mongoose.Types.ObjectId; 
          await Poll.create({
  
            admin: new ObjectId(request.body.admin),
            poll_name: request.body.poll_name,
            description: request.body.description,
            deadline:'2020-02-02',
            created_on:'2021-03-03'
  
          });
  
      }
  
      response.send("Done")
    
  
  }

  export { getPolls, createPoll }

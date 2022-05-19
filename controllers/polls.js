import Poll from '../models/poll.js';
import PollQues from '../models/poll-questions.js';
import pollResponse from '../models/response.js';
import mongoose from 'mongoose';
import Student from "../models/student.js"
import Admin from "../models/admin.js"
import { request } from 'express';
const getPolls = async (request, response) => {
  var ObjectId = mongoose.Types.ObjectId;
  let polls = await Poll.find({ admin: new ObjectId(request.params.adminId) });

  try {
    response.status(200).send(polls);
  } catch (error) {
    console.log('Failure');
    response.status(500).send(error);
  }
};

const getDetails = async (request, response) => {
    let ObjectId = mongoose.Types.ObjectId;
    let ques = await PollQues.find({poll: new ObjectId(request.params.id)});
    let resp = await pollResponse.find({poll: new ObjectId(request.params.id)})
    var details = {questions: ques[0], responses: resp[0]}
    try {
        response.status(200).send(details);
    } catch (error) {
        console.log('Failure');
        response.status(500).send(error);
    }
}

export const createResponse = async (request, response) => {
    let ObjectId = mongoose.Types.ObjectId;
    let _poll = new ObjectId(request.params.id);

    try{
        let pollQ = PollQues.find( {poll: _poll} )[0]
        let pollResp = {
            poll: _poll,
            text_based : [],
            mcq : []  
        }

        for(let i = 0; i < pollQ.mcq.length; i++){
            pollResp.mcq[i] = {
                index : parseInt(pollQ.mcq[i].index),
                responses : []
            }
        }

        for(let i = 0; i < pollQ.text_based.length; i++){
            pollResp.text_based[i] = {
                index : parseInt(pollQ.text_based[i].index),
                responses : []
            }
        } 
        
        let pollRes = await pollResponse.create(pollResp)
        response.send(pollRes)


}

    catch(err) {
        response.send("Error")
    }




}

export const getQues = async (request, response) => {
    var ObjectId = mongoose.Types.ObjectId;
    console.log(request.params)
    let ques = await PollQues.find({poll: new ObjectId(request.params.id)});
    let polls = await Poll.find({_id: new ObjectId(request.params.id)});
    var details = {
        published: polls[0].published,
        poll_name: polls[0].poll_name,
        description: polls[0].description,
        questions: ques,
    }
    try {
        response.send(details);
    } catch (error) {
        console.log('Failure');
        response.status(500).send(error);
    }
}



const editPoll = async (request, response) => {
  try {
    console.log(request.body);
    console.log(request.params);
    await Poll.findByIdAndUpdate(request.params.id, request.body);
    response.status(200).send('Done');
  } catch (error) {
    response.status(500).send(error);
  }
};

export const deletePoll = async (request, response) => {
    try {
        var ObjectId = mongoose.Types.ObjectId;
        console.log(request.params);
        await Poll.deleteOne({_id: new ObjectId(request.params.id)});
        await PollQues.deleteOne({poll: new ObjectId(request.params.id)});
        response.status(200).send('Deleted');
    } catch (error) {
        response.status(200).send(error);
    }
};

export const editPollQues = async (request, response) => {

    try {
        console.log(request.body);
        console.log(request.params);
        await PollQues.findByIdAndUpdate( request.params.id, request.body);
        response.status(200).send('Done');
    } catch (error) {
        response.status(500).send(error);
    }


};

const createPoll = async (request, response) => {
  let ObjectId = mongoose.Types.ObjectId;

  let newPoll = await Poll.create({
    admin: new ObjectId(request.user._id),
    poll_name: 'Untitled',
    description: 'No Description',
    deadline: new Date(),
    created_on: new Date(),
    published_on: new Date(),
    published: false,
  });

  response.status(200).send(newPoll);
};

const populatePoll = async (request, response) => {
    try {
        let ObjectId = mongoose.Types.ObjectId;
        let newQuestions = await PollQues.create(
            {
                poll: new ObjectId(request.body.poll),
                mcq: [],
                text_based: [
                    {
                        index: 0,
                        statement: "Untitled Question"
                    }
                ]
            }
        )
        response.status(200).send(newQuestions)
    } catch (err) {
        console.log(err)
        response.status(500).send(error);
    }
}

export const addStudentResponse = async (request, response) =>{
    try{
        let resp = await pollResponse.find({ poll: new mongoose.Types.ObjectId(request.params.pollId) })[0]
        let questions = resp[request.body.type].copy()
        questions = questions.map( ques => ques.index )
        let index = questions.indexOf(request.body.index)
        resp[request.body.type][index].responses.push(request.body.response)
        await pollResponse.findByIdAndUpdate(resp._id.valueOf(), resp)
        response.send("Done")
}
    catch(err){
        
        console.log(err)
        response.send("ERROR ADDING RESPONSE")
    }


}

export const getStudentPolls = async (request, response) => {
    let groupMap = {
        'DD Hostel':{status: 'Hostellite'},
        'DD Student Affairs':{},
        'DD Transport': { transport:{
            pickAndDrop:true
        } },
        'Faculty Sponsor-SEECS': {
            school: 'SEECS'
        },
        'Faculty Sponsor UG Freshman Batch-SEECS': { batch: "2021", graduateLevel:"UG" },
        'Faculty Sponsor UG Sophomore Batch-SEECS': { batch: "2020", graduateLevel:"UG" },
        'Faculty Sponsor UG Junior Batch-SEECS': { batch: "2019", graduateLevel:"UG" },
        'Faculty Sponsor UG Senior Batch-SEECS': { batch: "2018", graduateLevel:"UG" },
        'Faculty Sponsor PG 1st Year Batch-SEECS': { batch: "2020", graduateLevel:"MS" },
        'Faculty Sponsor PG 2nd Year Batch-SEECS': { batch: "2021", graduateLevel:"MS" },
        'DD in NUST Main Office':{}
    }
    try{
        let admins = []
        for( let admin in groupMap ){
            let students = await Student.find(groupMap[admin]);
            let ids = students.map(std => std._id.valueOf())
            if (ids.includes(req.user._id)){
                admins.push(admin)
            }

        }
        let adminList = await Admin.find({ title: {$in: admins}})
        adminList = adminList.map( adm => adm.admin.valueOf() )
        let polls = await Poll.find({ admin:{$in:adminList} })
        response.send(polls) 
}
    catch(err){
        console.log(err)
        response.send("ERROR FETCHING POLLS")
    }
    

}

export { getPolls, createPoll, editPoll, populatePoll, getDetails };

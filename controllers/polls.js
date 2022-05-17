import Poll from '../models/poll.js';
import PollQues from '../models/poll-questions.js';
import pollResponse from '../models/response.js';
import mongoose from 'mongoose';


const getPolls = async (request, response) => {
    var ObjectId = mongoose.Types.ObjectId;
    let polls = await Poll.find({admin: new ObjectId(request.params.adminId)});

    try {
        response.send(polls);
    } catch (error) {
        console.log('Failure');
        response.status(500).send(error);
    }


};

const getDetails = async (request, response) => {
    var ObjectId = mongoose.Types.ObjectId;
    let ques = await PollQues.find({poll: new ObjectId(request.params.id)});
    let resp = await pollResponse.find({poll: new ObjectId(request.params.id)})
    var details = {questions: ques, responses: resp}
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
        response.send('Done');
    } catch (error) {
        response.status(500).send(error);
    }
};

export const deletePoll = async (request, response) => {
    try {
        console.log(request.params);
        await Poll.deleteOne({_id: request.params.id});
        response.send('Deleted');
    } catch (error) {
        response.status(200).send(error);
    }
};

export const editPollQues = async (request, response) => {

    try {
        console.log(request.body);
        console.log(request.params);
        await PollQues.findByIdAndUpdate(request.params.id, request.body);
        response.send('Done');
    } catch (error) {
        response.status(500).send(error);
    }


};

const createPoll = async (request, response) => {
    let ObjectId = mongoose.Types.ObjectId;

    let newPoll = await Poll.create({
        admin: new ObjectId(request.user._id),
        poll_name: "Untitled",
        description: "No Description",
        deadline: new Date,
        created_on: new Date,
        published: false
    });

    response.send(newPoll);
};


const populatePoll = async (request, response) => {
    try {
        let newQuestions = await PollQues.create(
            {
                mcq: [],
                text_based: [
                    {
                        index: 0,
                        statement: "Untitled Question"
                    }
                ]
            }
        )
        response.send(newQuestions)
    } catch (err) {
        console.log(err)
        response.status(500).send(error);
    }
}

export {getPolls, createPoll, editPoll, populatePoll, getDetails};

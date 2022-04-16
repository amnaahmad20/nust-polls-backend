import Poll from '../models/poll.js';
import mongoose from 'mongoose';

const getPolls = async (request, response) => {
  console.log(request.params);
  var ObjectId = mongoose.Types.ObjectId;
  let polls = await Poll.find({ admin: new ObjectId(request.params.adminId) });

  try {
    response.send(polls);
  } catch (error) {
    console.log('Done');
    response.status(500).send(error);
  }
};

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
  await Poll.create({
    admin: new ObjectId(request.body.admin),
    poll_name: request.body.poll_name,
    description: request.body.description,
    deadline: '02-02-2022',
    created_on: '01-01-2022',
  });

  response.send('Done');
};

export { getPolls, createPoll, editPoll };

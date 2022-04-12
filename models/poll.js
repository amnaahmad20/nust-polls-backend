import mongoose from 'mongoose';

const pollSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  poll_name: {
    type: String,
    required: true,
  },
  description: {
      type:String,
      required: true
  }
});

const Poll = mongoose.model('Poll', pollSchema);

export default Poll;
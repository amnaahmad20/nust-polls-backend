import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Admin', adminSchema);

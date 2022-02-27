import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  batch: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['hostellite', 'dayscholar'],
  },
});

export default mongoose.model('Student', studentSchema);

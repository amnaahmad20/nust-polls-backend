import mongoose from 'mongoose';


const responseSchema = new mongoose.Schema({

    poll: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Poll',
      },

    text_based: {
        type: mongoose.Schema.Types.Array
      },

    mcq: {
        type: mongoose.Schema.Types.Array
        
      }
    
    }
)

const pollResponse = mongoose.model('Response', responseSchema);

export default pollResponse;


import mongoose from 'mongoose';
const { Schema } = mongoose;

const StudentSchema = new Schema({
  rfid: {
    type: String,
  },
  name: {
    type: String,
  },
  event: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true
  },
  allowed: {
    type: Boolean,
    default: false,
    
  },
  attendance: {
    type: Boolean,
    default: false
  }
  
});

const Student = mongoose.model('students', StudentSchema);

export default Student;
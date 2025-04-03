import mongoose from "mongoose";
const { Schema } = mongoose;

const staffSchema = new Schema({
  name: {
    type: String,
    required: false,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "supperAdmin", "staff"]
  }
},{
  timestamps:true
});

export default mongoose.model("Staff", staffSchema)
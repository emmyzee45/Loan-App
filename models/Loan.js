import mongoose from "mongoose";
const { Schema } = mongoose;

const LoanSchema = new Schema({
    amount: {
        type: String,
        required: true
    },
    maturityDate: {
        type: Date,
        required: true
    },
    status: { 
        type: String, 
        enum: ["pending", "active"] 
    },
    applicant: {
      name: {
        type: String,
        required: true
      },
      email: { 
        type: String, 
        required: true 
    },
      telephone: {
        type: String,
        required: true
      },
      totalLoan: {
        type: String,
        required: true
      },
    },
  },
  {timestamps: true}
);
  
export default mongoose.model("Loan", LoanSchema)
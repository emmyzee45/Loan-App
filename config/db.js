import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};

export default connect;

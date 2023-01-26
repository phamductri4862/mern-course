import mongoose, { mongo } from "mongoose";

const connectDB = (url) => {
  mongoose.set("strictQuery", true);
  return mongoose.connect(url);
};

export default connectDB;

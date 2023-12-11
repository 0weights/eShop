import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    let instancePromise = await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log(error.message);
    // search explain this in details
    process.exit(1);
  }
};
export default connectToDb;

import {mongoose} from "mongoose";
import colors from "colors";

const connectToDb = async () => {
  try {
    let instancePromise = await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to the database".green)
  } catch (error) {
    console.log(error.message);
    // search explain this in details
    process.exit(1);
  }
};
export default connectToDb;

import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo Db Connected: ", conn.connection.host);
  } catch (error) {
    console.error("Mongo Db connection error ", error);
    process.exit(1);
  }
};

export default connectDb;
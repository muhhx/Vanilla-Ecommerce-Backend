import mongoose from "mongoose";

const dbUri = process.env.MONGODB_URI as string;

const connectDatabase = async () => {
  try {
    await mongoose.connect(dbUri);
    console.log("Database connected!");
  } catch (error) {
    console.log("Could not connect to the database.");
    process.exit(1);
  }
};

export default connectDatabase;

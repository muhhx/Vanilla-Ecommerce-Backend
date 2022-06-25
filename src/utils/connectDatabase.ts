import config from "config";
import mongoose from "mongoose";

const dbUri = config.get<string>("dbUri");

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

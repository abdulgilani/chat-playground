import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("CONNECTED TO MONGODB");
  } catch (error) {
    console.error("ERROR CONNECTING TO MONGODB:", error);
    process.exit(1);
  }
};

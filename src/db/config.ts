import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const MONGO_URL = process.env.MONGO_URL || "";
export const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(MONGO_URL, {
      autoIndex: true,
    });
    const url = `${connection.connection.host} : ${connection.connection.port}`;
    console.log(`MongoDB conected on ${url}`);
  } catch (error) {
    console.log(`Error: ${error}}`);
    process.exit(1);
  }
};

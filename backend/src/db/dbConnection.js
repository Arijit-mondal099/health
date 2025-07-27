import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const dbConnection = async () => {
  try {
    const res = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log("DB :: Data base connected successfully ->", res.connection.host);
  } catch (err) {
    console.log("DB :: Data base connection error ->", err.message);
    process.exit(1);
  }
};

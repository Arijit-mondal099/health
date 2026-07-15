import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        const res = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("DB :: Database connected successfully ->", res.connection.host);
    } catch (err) {
        console.log("DB :: Database connection error ->", err.message);
        process.exit(1);
    }
};
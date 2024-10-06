import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

const mongo_uri = process.env.MONGO_URI;
export const port = process.env.PORT;

const connectDB = async () => {
    return mongoose
    .connect(mongo_uri)
    .then(() => console.log("connected to the database successfully"))
    .catch((error) => console.log("unable to connect to database", error));
}

export default connectDB;
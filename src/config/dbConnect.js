import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
const mongoUrl = process.env.MONGO_DB;


mongoose.connect(mongoUrl);

export let db = mongoose.connection;

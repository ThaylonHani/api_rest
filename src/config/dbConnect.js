/* eslint-disable no-console */
import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';

configDotenv();
const mongoUrl = process.env.MONGO_DB;

mongoose.connect(mongoUrl).then(() => console.log('Connected to DB')).catch((e) => console.log(e));

export const db = mongoose.connection;

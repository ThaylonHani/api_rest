import express from "express";
import { db } from "./config/dbConnect.js";
import books  from "./models/Book.js";
import routes from "./routes/index.js"; 

db.on("error", console.log.bind(console, 'Connection error with database'));
db.once("open", () => {
  console.log("Connection with database successfully");
})

export const app = express();
app.use(express.json());
routes(app);
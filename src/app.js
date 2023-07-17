/* eslint-disable no-console */
import express from 'express';
import { db } from './config/dbConnect.js';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { Handle404 } from './middlewares/404Handler.js';

db.on('error', console.log.bind(console, 'Connection error with database'));
db.once('open', () => {
  console.log('Connection with database successfully');
});

export const app = express();
app.use(express.json());
routes(app);

app.use(Handle404);

// eslint-disable-next-line no-unused-vars
app.use(errorHandler);

import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from './model/user';
import Admin from './model/admin';
import socketIO from 'socket.io';
import cors from 'cors';
import corsOption from './config/corsOption';
import connectDB from './config/db';
import appRouter from './router/operations';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware setup
app.use(cors(corsOption));
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(appRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the default route. If you see this message, it means the backend API is up and running.");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Uncomment and configure if you need Socket.IO
// const io = new socketIO.Server();
// io.listen(1230, () => {
//   console.log("Socket server started on port 1230");
// });

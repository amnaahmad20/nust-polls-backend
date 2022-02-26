import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import passport from 'passport';
import passportLocal from 'passport-local';

//APP CONFIG

dotenv.config({ path: '.env' });
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL,
  })
);
app.use(morgan('tiny'));

//DATABASE CONNECT

mongoose.connect(process.env.CONNECTION_URL);

//SERVER LISTEN

const PORT = process.env.PORT || 9000;
const server = app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});

//DATABASE ERROR

process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Erorr ${err}`);
  server.close(() => {
    process.exit(1);
  });
});

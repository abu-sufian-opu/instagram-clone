import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import studentRoute from './routes/student.js'
import userRoute from './routes/user.js'
import mongoDBConnect from './config/db.js';
import errorhandler from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';




//init express
const app = express();
dotenv.config();


//init env variables
const PORT = process.env.SERVER_PORT || 5000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(cookieParser());
app.use(cors());

//routes
app.use('/api/student', studentRoute);
app.use('/api/user', userRoute);

//express error handler
app.use(errorhandler);

//listen server
app.listen(PORT, () => {
    mongoDBConnect();
    console.log(`server running on port ${PORT}`.bgGreen.black);
})
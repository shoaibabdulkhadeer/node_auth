import * as express from 'express';
import mongoose from 'mongoose';
const session = require('express-session');
import  {config} from 'dotenv';
import userRoute from './routes/userroute';
import authRoute from './routes/authroute';
import connectToDB from './database/connection.mongo';

config(); 

const app = express();
app.use(express.json())

app.use(session({
    secret: 'secret-key', 
    resave: false,
    saveUninitialized: false,
  }));  

app.use('/api',userRoute);
app.use('/api',authRoute);

const {PORT} = process.env

app.get('/',(req,res) => {
    res.send("hello")
})

app.listen(PORT,async() => {
    await connectToDB()
    console.log('listening on port 4000');
})      



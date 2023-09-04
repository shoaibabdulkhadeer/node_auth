import * as express from 'express';
import mongoose from 'mongoose';
import  {config} from 'dotenv';
import userRoute from './routes/userroute';
import authRoute from './routes/authroute';

config(); 

const app = express();
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017")
.then(() => console.log("Connected to MongoDB"))    
.catch((err) => console.log(err))


app.use('/api',userRoute);
app.use('/api',authRoute);

const {PORT} = process.env

app.get('/',(req,res) => {
    res.send("hello")
})

app.listen(PORT,() => {
    console.log('listening on port 4000');
})      
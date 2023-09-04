import { Router } from 'express';
import { register } from '../modules/user/user.controller';


const userRoute = Router();

userRoute.post('/register', register);    

export default userRoute;

import { Router } from 'express';
import { deleteuser, register, updateuser } from '../modules/user/user.controller';

const userRoute = Router();

userRoute.post('/register', register);    
userRoute.delete('/delete/:id',deleteuser)
userRoute.patch("/update/:id",updateuser)

export default userRoute;

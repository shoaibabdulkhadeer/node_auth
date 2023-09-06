import { Router } from 'express';
import { deleteuser, register, updateuser } from '../modules/user/user.controller';
import { verifyToken } from '../modules/auth/auth.service';

const userRoute = Router();

userRoute.post('/register', register);    

// userRoute.delete('/delete/:id',deleteuser)
userRoute.delete('/delete/:id', verifyToken, deleteuser);

userRoute.patch("/update/:id",updateuser)

export default userRoute;

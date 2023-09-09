import { Router } from 'express';
import { deleteuser, getusers, register, updateuser } from '../modules/user/user.controller';
import { session, verifyToken } from '../modules/auth/auth.service';

const userRoute = Router();

userRoute.post('/register', register);    

userRoute.delete('/delete/:id',deleteuser)
// userRoute.delete('/delete/:id', verifyToken, deleteuser);

    userRoute.patch("/update/:id",verifyToken,session,updateuser)

    userRoute.get("/getusers",getusers) 
export default userRoute;

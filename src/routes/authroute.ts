import { Router } from 'express';
import { login,logout } from '../modules/auth/auth.controller';
import { session, verifyToken } from '../modules/auth/auth.service';

const authRoute = Router();

authRoute.post('/login', login);  
authRoute.delete('/logout/:id',verifyToken,session, logout);   


export default authRoute;

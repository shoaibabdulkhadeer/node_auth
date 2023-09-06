import { Router } from 'express';
import { login,logout } from '../modules/auth/auth.controller';

const authRoute = Router();

authRoute.post('/login', login);  
authRoute.patch('/logout', logout);   


export default authRoute;

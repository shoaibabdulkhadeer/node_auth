import { Router } from 'express';
import { login,logout } from '../modules/auth/auth.controller';

const authRoute = Router();

authRoute.post('/login', login);  
authRoute.delete('/logout/:id', logout);   


export default authRoute;

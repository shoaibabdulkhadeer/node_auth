import { Router } from 'express';
import { login } from '../modules/auth/auth.controller';


const authRoute = Router();

authRoute.post('/login', login);    

export default authRoute;

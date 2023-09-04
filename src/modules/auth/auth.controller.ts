import {Request,Response} from 'express';
import { userlogin } from './auth.service';

const login = async (req:Request,res:Response) => {
    const loginUser =  req.body
    const logUser = await userlogin(loginUser,req)
    if(loginUser) {
        res.send("login successful")
    }

  
}


const logout = (req:Request,res:Response) => {
    
}

export {login}

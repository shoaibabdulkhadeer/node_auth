import {Request,Response} from 'express';
import { userlogin,userlogout} from './auth.service';

const login = async (req:Request,res:Response) => {
    try{
        const loginUser =  req.body
        const logUser = await userlogin(loginUser,req)
        if(loginUser) {
            res.send("login successful")
        }
    }
    catch(err) {
        res.send(err)
    }
 
}

const logout = (req:Request,res:Response) => {
    userlogout(req,res)
    
}

export {login,logout} 

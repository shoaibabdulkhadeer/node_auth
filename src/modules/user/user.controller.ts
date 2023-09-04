import {Request,Response} from 'express';
import { userRegisterSvc } from './user.service';

const register = async  (req:Request,res:Response) => {
          const newUser =  req.body
          const registeredUser = await userRegisterSvc(newUser)
          res.send("Registered")
    }

export {register}
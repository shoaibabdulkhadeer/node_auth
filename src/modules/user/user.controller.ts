import {Request,Response} from 'express';
import { deleteuserSvc, userRegisterSvc,updateuserSvc } from './user.service';

const register = async  (req:Request,res:Response) => {
          const newUser =  req.body
          const registeredUser = await userRegisterSvc(newUser)
          res.send("Registered")
    }

const deleteuser = async (req:Request,res:Response) => {
  const {id} = req.params
  const deleteUser = await deleteuserSvc(id)
    res.send(deleteUser)
}

const updateuser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedUser = await updateuserSvc(id, updatedData);
    res.send(updatedUser);
  };
  

export {register,deleteuser,updateuser} 
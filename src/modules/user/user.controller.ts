import {Request,Response} from 'express';
import { deleteuserSvc, userRegisterSvc,updateuserSvc, getusersSvc } from './user.service';

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
  

  const getusers = async (req: Request, res: Response) => {
    const pageId = parseInt(req.query.pageId as string, 10) || 1;
    const pageLimit = parseInt(req.query.pageLimit as string, 10) || 10;
 
    const allusers = await getusersSvc(pageId, pageLimit);
 
    res.send({
      message: "All users",
      allusers,
    });
 }

export {register,deleteuser,updateuser,getusers} 
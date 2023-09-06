import {Request,Response} from 'express';
import { userlogin,userlogout} from './auth.service';


const login = async (req:Request,res:Response) => {
    try{
        const loginUser =  req.body
        const logUser = await userlogin(loginUser,req)
        if(loginUser) {
            res.send(logUser)
        }
    }
    catch(err) {
        res.send(err)
    }
 
}

const logout = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      await userlogout(id);
      res.send('Logout successful');
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).send('Logout failed');
    }
  };

export {login,logout} 






  
  
  
  
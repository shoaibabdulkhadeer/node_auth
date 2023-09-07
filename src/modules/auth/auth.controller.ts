import {Request,Response} from 'express';
import { userlogin,userlogout} from './auth.service';
import { SUCCESS_MESSAGES } from '../../shared/appMessages.schema';


const login = async (req: Request, res: Response) => {
  try {
      const loginUser = req.body;
      const logUser = await userlogin(loginUser, req);

      if (typeof logUser === 'string') {
          res.send(logUser);
      } else {
          res.json(logUser);
      }
  } catch (err) {
      res.send(err);
  }
};


const logout = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      await userlogout(id);
      res.send(SUCCESS_MESSAGES.LOGOUT);
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).send('Logout failed');
    }
  };

export {login,logout} 






  
  
  
  
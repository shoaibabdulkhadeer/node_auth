import { findLoggedIndao, findUserByNameAndPwd } from "../../database/dao/auth.dao";
import {compare} from "bcrypt";
import * as jwt from 'jsonwebtoken';
import loginSchema from "../../database/schema/login-schema";
import { SUCCESS_MESSAGES, WARN_MESSAGES } from "../../shared/appMessages.schema";
import { NextFunction, Response } from "express";

const userlogin = async (loginuser: any, req: any) => {
  const { uname, pwd } = loginuser;

  if (!uname || !pwd) {
    throw new Error('Both name and password must be provided for login');
  }

  //in dao  
  const foundUser = await findUserByNameAndPwd(uname);

  if (!foundUser) {
    throw new Error('User not found or invalid credentials');
  }

  const isPasswordValid = await compare(pwd, foundUser.pwd);

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  // Check if the user is already logged in login schema ---- IN DAO
  const existingLoginInfo = await findLoggedIndao(foundUser.uID);

  if (existingLoginInfo) {
     return WARN_MESSAGES.ALREADY_LOGGED_IN;  //USER ALREADY_LOGGED_IN
  }

  // Create a new record in loginSchema
  const loginInfo = await loginSchema.create({
    uid: foundUser.uID,
    rid: foundUser.roles[0].rID,
    rname: foundUser.roles[0].rName,
    start_ts: Date.now(),
    end_ts: Date.now() + 20 * 60 * 1000, // 20 minutes
  });

  // Generate JWT token with user information
  const token = jwt.sign(
    {
      userId: foundUser._id,
      userName: foundUser.uname,
    },
    'your-secret-key',
    { expiresIn: '20m' }
  );

  console.log(token);
  return { message: SUCCESS_MESSAGES.LOGIN, token };
};

 const userlogout = async (id: any) => {
    try {
      await loginSchema.findByIdAndDelete(id).exec();
    } catch (error) {
      console.error('Error removing login information from the database:', error);
      throw error; 
    }
  };
  
export { userlogin ,userlogout } 


export const verifyToken = async (req: any, res: Response, next: NextFunction) => {
  const jwtKey = "your-secret-key";
  console.log("im in verify");
  try {
    const token: any = req.headers["authorization"];
    if (token && jwtKey) {
      const tokenSplit = token.split(" ")[1];
      console.log(tokenSplit, "im in split");
      req.claims = jwt.verify(tokenSplit, jwtKey);
      console.log("im going to next");
      next();
    } else {
      console.log("im in else");
      res.sendStatus(401); // Send Unauthorized status
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(401); // Send Unauthorized status
  }
};



export const session =  async (req:any,res:Response,next:NextFunction) => {
  const {exp} = req.claims;
  console.log(exp , "i am expiry date");  
  next()
}
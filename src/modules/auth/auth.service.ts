import { findUserByNameAndPwd } from "../../database/dao/auth.dao";
import {compare} from "bcrypt";
import * as jwt from 'jsonwebtoken';
import loginSchema from "../../database/schema/login-schema";

const userlogin = async (loginuser: any, req: any) => {
  const { uname, pwd } = loginuser;

  if (!uname || !pwd) {
    throw new Error('Both name and password must be provided for login');
  }

  const foundUser = await findUserByNameAndPwd(uname);

  if (!foundUser) {
    throw new Error('User not found or invalid credentials');
  }

  const isPasswordValid = await compare(pwd, foundUser.pwd);

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  // Check if the user is already logged in
  const existingLoginInfo = await loginSchema.findOne({ uid: foundUser.uID });

  if (existingLoginInfo) {
     return 'User is already logged in';
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
  return { message: 'Login successful', token };
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



export const verifyToken = (req:any, res:any, next:any) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, 'your-secret-key', (err:any) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};


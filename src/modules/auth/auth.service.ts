import { findUserByNameAndPwd } from "../../database/dao/auth.dao";


import {compare} from "bcrypt";

const userlogin = async (loginuser:any, req: any) => {
  const { name, pwd } = loginuser;

  if (!name || !pwd) {
    throw new Error('Both name and password must be provided for login');
  }

  const foundUser = await findUserByNameAndPwd(name);

  if (!foundUser) {
    throw new Error('User not found or invalid credentials');
  }

  const isPasswordValid = await compare(pwd, foundUser.pwd);

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  if (isPasswordValid) {
    req.session.userId = foundUser._id;
    req.session.userName = foundUser.name;
  }

  return 'Login successful';
};

export { userlogin }

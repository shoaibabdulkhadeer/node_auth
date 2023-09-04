import mongoose from "mongoose";
import {hash} from "bcrypt";
import { registeruserdao } from "../../database/dao/user.dao";

const userRegisterSvc = async (User: any) => {
  const { name, dept, pwd } = User;
  const roleNames = User.roles;

  if (!name || !dept || !pwd || !roleNames || roleNames.length === 0) {
    throw new Error('All required fields must be provided');
  }

  const hashedPwd = await hash(pwd, 10);    

  const roles = roleNames.map((rName: any) => ({
    rID: new mongoose.Types.ObjectId(),
    rName,
    start_ts: new Date(),
    end_ts: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  }));

  const newUser = {
    name,
    dept,
    pwd: hashedPwd, 
    uID: new mongoose.Types.ObjectId(),
    createdAt: new Date(),
    updatedAt: new Date(),
    roles,
  };

  await registeruserdao(newUser);
};

export { userRegisterSvc };

import mongoose from "mongoose";
import {hash} from "bcrypt";
import { registeruserdao, userdeletedao,userupdatedao } from "../../database/dao/user.dao";

const userRegisterSvc = async (User: any) => {
  const { name, dept, pwd,emp_id,uname,comm_email,active } = User;
  const roleNames = User.roles;

  if (!name || !dept || !pwd || !roleNames || roleNames.length === 0) {
    throw new Error('All required fields must be provided');
  }

  const hashedPwd = await hash(pwd, 10);    

  const thirtyDaysLater = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);

  const roles = roleNames.map((rName: any) => ({
    rID: new mongoose.Types.ObjectId(),
    rName,
    start_ts: new Date(),
    end_ts: thirtyDaysLater,
  }));

  const newUser = {
    name,
    dept,
    pwd: hashedPwd, 
    uID: new mongoose.Types.ObjectId(),
    roles,
    emp_id,
    uname,
    comm_email,
    active 
  };

  await registeruserdao(newUser);
};


const deleteuserSvc = (id:any) => {
      return userdeletedao(id)
}

const updateuserSvc = (id:any,updatedData:any) => {
  return  userupdatedao(id,updatedData)
}

export { userRegisterSvc,deleteuserSvc,updateuserSvc };

import mongoose from "mongoose";
import { hash } from "bcrypt";
import * as httpStatus from "http-status";
import { getusersdao, registeruserdao, userdeletedao, userupdatedao } from "../../database/dao/user.dao";
import { createResponse } from "../../shared/appResponse.shared";
import { ERROR_MESSAGES } from "../../shared/appMessages.schema";

const userRegisterSvc = async (User:any) => {
  try {
    const { name, dept, pwd, emp_id, uname, comm_email, active } = User;
    const roleNames = User.roles;

    if (!name || !dept || !pwd || !roleNames || roleNames.length === 0) {
      return createResponse(httpStatus.BAD_REQUEST, ERROR_MESSAGES.BAD_REQUEST);
    }

    const hashedPwd = await hash(pwd, 10);

    const thirtyDaysLater = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);

    const roles = roleNames.map((rName:any) => ({
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
      active,
    };

    await registeruserdao(newUser);

    return createResponse(httpStatus.OK, "User registered successfully");
  } catch (error) {
    console.error(error);
    return createResponse(httpStatus.INTERNAL_SERVER_ERROR, ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const deleteuserSvc = (id:any) => {
  try {
    return userdeletedao(id);
  } catch (error) {
    console.error(error);
    return createResponse(httpStatus.INTERNAL_SERVER_ERROR, ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const updateuserSvc = (id:any, updatedData:any) => {
  try {
    return userupdatedao(id, updatedData);
  } catch (error) {
    console.error(error);
    return createResponse(httpStatus.INTERNAL_SERVER_ERROR, ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

const getusersSvc = (pageId:any, pageLimit:any) => {
  try {
    return getusersdao(pageId, pageLimit);
  } catch (error) {
    console.error(error);
    return createResponse(httpStatus.INTERNAL_SERVER_ERROR, ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export { userRegisterSvc, deleteuserSvc, updateuserSvc, getusersSvc };

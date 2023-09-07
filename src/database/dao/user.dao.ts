import * as httpStatus from "http-status";
import { ERROR_MESSAGES, SUCCESS_MESSAGES, WARN_MESSAGES } from "../../shared/appMessages.schema";
import { UserAccount } from "../schema/user-schema"
import { createResponse } from "../../shared/appResponse.shared";

const registeruserdao = async (newUser:any) => {

    const existingUser = await UserAccount.findOne({
        name: newUser.name,
        pwd: newUser.pwd,
      });

    if(existingUser){
      return createResponse(httpStatus.CONFLICT, WARN_MESSAGES.CONFLICT);

    }
    const registerUser = await  UserAccount.create(newUser)
  //  return  registerUser.save()
}

 const userdeletedao = async (id:any) => {
        await UserAccount.findByIdAndDelete(id).exec()
        return createResponse(httpStatus.OK,SUCCESS_MESSAGES.DELETED)
 }

 const userupdatedao = async (id:any, updatedData:any) => {
  try {
    const updatedUser = await UserAccount.findByIdAndUpdate(id, { $set: updatedData }, { new: true });

    if (!updatedUser) {
      throw new Error('User not found');
    }
    return "updated successfully";
  } catch (error) {
    if (error instanceof Error && error.message === 'User not found') {
      throw new Error('User not found');
    }
    throw error;
  }
};


const getusersdao = async (pageId: number, pageLimit: number) => {
  try {
    let query = {};
    
    const skip = (pageId - 1) * pageLimit;

    const allusers = await UserAccount.find(query)
                                      .skip(skip)
                                      .limit(pageLimit);

    return allusers;
  } catch(err) {
    return ERROR_MESSAGES.NOT_FOUND;
  }
}


export {registeruserdao,userdeletedao,userupdatedao,getusersdao}
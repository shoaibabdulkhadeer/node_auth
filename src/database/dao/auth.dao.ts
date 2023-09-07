import { UserAccount } from "../../database/schema/user-schema";
import loginSchema from "../schema/login-schema";

const findUserByNameAndPwd = async (uname:any) => {
  try {
    const user = await UserAccount.findOne({uname });
    return user; 
  } catch (error) {
    throw new Error(`Error finding user: `);
  }
};

const findLoggedIndao = async (uID:any) => {
  return await loginSchema.findOne({ uid: uID });
}


const findByIdAndDeleteDao = async (id:any) => {
  try {
    const deletedDocument = await loginSchema.findByIdAndDelete(id).exec();
    return deletedDocument;
  } catch (error) {
    console.error('Error removing document from the database:', error);
    throw error;
  }
};

export { findUserByNameAndPwd,findLoggedIndao,findByIdAndDeleteDao };

import { UserAccount } from "../../database/schema/user-schema";


const findUserByNameAndPwd = async (uname:any) => {
  try {
    const user = await UserAccount.findOne({uname });
    return user; 
  } catch (error) {
    throw new Error(`Error finding user: `);
  }
};

export { findUserByNameAndPwd };

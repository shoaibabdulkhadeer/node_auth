import { UserAccount } from "../schema/user-schema"

const registeruserdao = async (newUser:any) => {

    const existingUser = await UserAccount.findOne({
        name: newUser.name,
        pwd: newUser.pwd,
      });

    if(existingUser){
        throw new Error('User with the same name and password already exists');
    }
    const registerUser = await  UserAccount.create(newUser)
  //  return  registerUser.save()
}

 const userdeletedao = async (id:any) => {
        await UserAccount.findByIdAndDelete(id).exec()
        return "deleted successfully"
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


export {registeruserdao,userdeletedao,userupdatedao}
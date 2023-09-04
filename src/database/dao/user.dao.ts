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
   return  registerUser.save()
}

export {registeruserdao}
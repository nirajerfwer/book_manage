import UserModel from "../db/user";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

export const getUserData = async () => {
  const UserData =  await UserModel.find();
  console.log(UserData);
  return UserData;
  
};
export const getUserByid = async (id:any) => {
  const UserData =  await UserModel.findById(id);
  console.log(UserData);
  return UserData;
  
};

export const createUser = async (userData: any) => {

  const hashedpassword = await bcrypt.hash(userData.password,10); // level of hasing .. 10

  let userdata = new UserModel({
        name: userData.name,
        gmail:userData.gmail,
        phone:userData.phone,
        password:hashedpassword,
    })
    let saveduser = await userdata.save(); /// will run the code ..
    return saveduser;
};

export const updateUser = async (id: any, data: any) => {
  const dataupdated = await UserModel.findByIdAndUpdate(id, data);
  console.log(dataupdated);
  return dataupdated;
};

export const deleteUser = async (id:any) => {
  const deleteduser = UserModel.findByIdAndDelete(id);
  return deleteduser;
    
};
export const loginuser = async (userData: any) => {
if(userData.gmail != null || userData.password != null){
  console.log("getting use data",userData.gmail);
  const singlesuserdata =  await UserModel.findOne({gmail:userData.gmail});
  console.log(singlesuserdata);
  

    const ismatched = await bcrypt.compare(userData.password,singlesuserdata?.password);
    if(ismatched){
      const jwttoken = jwt.sign(userData,process.env.JWTSecreteKey,{expiresIn:'1h'}); // creating json ktey
      
      return {message:"login successfull",data:userData,token:jwttoken};
      
    }else{
      return {message:"password incorrect"};
    }
  }else{
    return {message:"all fields are required"};
  }
};
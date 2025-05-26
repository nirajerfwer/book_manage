import {
  createUser,
  deleteUser,
  getUserByid,
  getUserData,
  loginuser,
  updateUser,
} from "../handler/auth_handler";
import { Request, Response } from "express";
const express = require("express");
const ARouter = express.Router();

const multer = require("multer");
const mymulter = multer();

ARouter.get("", mymulter.none(), async (req: Request, res: Response) => {
  try {
    // to Add user
    const userData =  await getUserData();
    console.log("userData",userData);
    res.status(200).send({ message: "user found", data: userData });
  } catch (err) {
    console.log("error while getting user");
  }
});

ARouter.get("/:id",mymulter.none(),async (req:Request,res:Response)=>{
  try{
    
    let id = req.params.id; // return the id   
    const userdata = await getUserByid(id);
    res.status(201).send({message:"data found by id",data:userdata});
  }catch(err){
    res.status(500).send({message:"error while getting data"})
  }
})

ARouter.post("/signup", mymulter.none(), async (req: Request, res: Response) => {
    // to Add user
    await createUser(req.body).then((data)=>{
       return res.status(201).send({message:"created User",data:data});
    }).catch((err)=>{
      return res.status(500).send({message:"error while creating user"});
    });
    // console.log("userData", createdData);
    
});

ARouter.put("/:id", mymulter.none(), async (req: Request, res: Response) => {
  try {
    // to Add user
    const userId = req.params.id;
    console.log("userid",userId);
    const bodyData = req.body;
    const userData = await updateUser(userId, bodyData);
    if (userData != null) {
      return res.status(200).send({ message: "user updated", data: userData });
    } else {
      return res.status(200).send({ message: "no user found" });
    }
  } catch (err) {
    console.log("error while updating user");
    res.status(500).send({ message: "error while updating user"});
  }
});
ARouter.delete("/:id", mymulter.none(), async (req: Request, res: Response) => {
  try {
    // to Add user
    const userId = req.params.id;
    const userData = await deleteUser(userId);
    if (userData != null) {
      return res.status(200).send({ message: "user deleted", data: userData });
    } else {
      return res.status(200).send({ message: "no user found" });
    }
  } catch (err) {
    console.log("error while deleting user");
    res.status(500).send({ message: "error while deleting user"});
  }
});

ARouter.post("/login",mymulter.none(), async (req:Request,res:Response)=>{
   // body will store gmail and password ..
   try{

     const logindata =  await loginuser(req.body);
     return res.status(200).send(logindata);
    }
    catch(err){
      console.log("error while login",err);
      return res.status(500).send({message:"error while login"})
    }

});

export default ARouter;

import { NextFunction, Request, Response } from "express";

const jwt = require('jsonwebtoken');


export const authmiddleware = async (req:Request,res:Response,next:NextFunction)=>{
    const token =  req.headers["authentication"];
    console.log("token",token);
    if(token){
        const isvalid = await jwt.verify(token,process.env.JWTSecreteKey);
        if(isvalid){
            next();
        }
        else{
            return res.status(403).send({message:"invalid token"});
        }
    }
    else{
        return res.status(401).send({message:"Access denied. No token provided."});
    }
}
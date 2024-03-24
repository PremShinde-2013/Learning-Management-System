import { NextFunction,Request,Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const ErrorMiddleware = (err:any,req:Request,res:Response,next:NextFunction)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";


    // wrong mongodb id error 
    if(err.name === 'CastError'){
        const message = `Resource not Found . Invalid : ${err.path}`;
        err = new ErrorHandler(message,400);
    }

    // Dublicate Key error
    if(err.code === 11000){
 const message = `Dublicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message,400);
       }

    //    wrong jwt error
    if(err.name === 'jsonWebTokenError'){
        const message = `json web token is invalid , try again`;
        err = new ErrorHandler(message,400 )
    }

    // Jwt expired error

  if(err.name === 'TokenExpiredError'){
        const message = `json web token is Expired , try again`;
        err = new ErrorHandler(message,400 );
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}
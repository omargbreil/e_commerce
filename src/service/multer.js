import multer from "multer";
import {StatusCodes , getReasonPhrase} from "http-status-codes";
import { asyncHandler } from "./asyncHandler.js";


export const validationtype =
{
    image: ['image/jpg' , 'image/png' , 'image/jpeg'],
    pdf : "application/pdf"

}

export const multerHandleError = ()=>
{
    return (err,req,res,next)=>
    {
        
            try 
            {
                if (err) 
        {
            next(new Error("multer error" , {cause:404}))

        }else
        {
            next()
        }
           
                
            } catch (error) 
            {
                next(new Error(error ,{cause:404}))    
            } 
        

    }
}
export const myMulter = (validationTypes)=>
{
    const storage = multer.diskStorage({});

    function fileFilter(req,file,cb) 
    {
        if (validationTypes.includes(file.mimetype)) 
        {
            cb(null,true)   
        }else
        {
            cb("invalid format" , false)
        }
        
    }

    const upload = multer({fileFilter , storage});

    return upload

}

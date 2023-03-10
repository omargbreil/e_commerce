import { userModel } from "../../../../DB/models/user/userModel.js";
import  bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {sendEmail} from "../../../service/sendEmail.js"
import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../../../service/asyncHandler.js";

export const signUp = asyncHandler(async(req,res,next)=>
{
    

        let{user_name , email , password , phone} = req.body;

         const user = await userModel.findOne({email});



        


        
        if (!user) 
        {
            let hashed = bcrypt.hashSync(password , parseInt(process.env.saltRound));
            let addUser = new userModel({user_name , email , password:hashed , phone});

            let token = jwt.sign({id:addUser._id , email:email} , process.env.signatureToken , {expiresIn:"1hr"});
            let link =`${req.protocol}://${req.headers.host}${process.env.baseUrl}/auth/confirmEmail/${token}`;

            let message = `verify your email <a href="${link}">click here</a>`;

            let result =await sendEmail(email , message);

            

            
            if (result.accepted.length) 
            {
                let savedUser = await addUser.save();
                res.status(201).json({message:"done" , savedUser});
            }else
            {
                // res.status(404).json({message:"invalid email"});
                next(new Error("invalid email" , {cause:404}))
            
            }
        }else
        {
            // res.status(409).json({message:"email already register" , status:409});
            next(new Error("email already register" , {cause:409}));
        }
        
    
})


export const confirmEmail =asyncHandler(async(req,res,next)=>
{
 
  
    let {token} = req.params;

    let decoded = jwt.verify(token , process.env.signatureToken);
    if (!decoded) 
    {
        // res.status(400).json({message:"invalid token"});
        next(new Error("invalid token" , {cause:400}))
    }else
    {
        let update = await userModel.findByIdAndUpdate(decoded.id,
            {
                is_confirmed:true
            },{new:true});

            if (update) 
            {
                res.redirect('https://www.instagram.com/');
            }else
            {
                // res.status(400).json({message:"error"});

                next(new Error("invalid token" , {cause:404}))
            
            }
    }
 
})


export const signIn =asyncHandler(async(req,res,next)=>
{
    

        let {email , password } = req.body;

        let user = await userModel.findOne({email});

        if (user) 
        {
            let comparePassword = bcrypt.compareSync(password , user.password);
            if (comparePassword) 
            {
                if (user.is_confirmed) 
                {
                    let token = jwt.sign({id:user._id , isLoggedIn:true , email:email} , process.env.emailToken , {expiresIn:"1hr"});
                    res.status(200).json({message:"done" , token});
                }else
                {
                    // res.status(400).json({message:"you have to confirm your email"});
                    next(new Error("you have to confirm your email" , {cause:400}));

                }

                
            }else
            {
                // res.status(400).json({message:"incorrect password"}); 
                next(new Error("incorrect password" , {cause:400}));
            }   
        }else
        {
            // res.status(404).json({message:"you have to register"});
            next(new Error("you have to register" , {cause:404}))
            
        }
        
    
});

            



        
            
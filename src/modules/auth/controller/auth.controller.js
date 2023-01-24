import { userModel } from "../../../../DB/models/user/userModel.js";
import { asyncHandler } from "../../../service/asyncHandler.js";

export const updateRole = asyncHandler(async(req,res,next)=>
{
    let {email}=req.body
    let user = await userModel.findOne({email});
    if (!user) 
    {
        next(new Error("invalid email" , {cause:400}));    
    }else
    {
        if (user.is_confirmed) 
        {
            let updatedUser = await userModel.findByIdAndUpdate(user._id,
                {
                    role:"admin"
                },{new:true});
            res.status(200).json({message:"done" , updatedUser});    
        }else
        {
            next(new Error("the email have to confirm" , {cause:400}));
        }
    }
}); 
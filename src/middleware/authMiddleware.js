import { userModel } from "../../DB/models/user/userModel.js";
import  jwt  from "jsonwebtoken";
import { asyncHandler } from "../service/asyncHandler.js";

export const roles=
{
    user:"user",
    admin:"admin"
}


export const auth =(acceptRole=[roles.user])=>
{
    return asyncHandler(async(req,res,next)=>
    {
       
            let {authorization}= req.headers;
            if (authorization.startsWith(process.env.bearerToken)) 
            {
                let token =authorization.split(" ")[1];

                const decoded = jwt.verify(token,process.env.emailToken);
                if (!decoded.id || !decoded.isLoggedIn) 
                {
                    next(new Error("invalid token" , {cause:404}))
                    
                }else
                {
                    const user = await userModel.findById(decoded.id);
                    if (!user) 
                    {
                        next(new Error("invalid id" , {cause:404}))

                    }else
                    {
                        if (!acceptRole.includes(user.role)) 
                        {
                            return res.status(403).json({message:"not authorized" , state:403})
                        }

                            
                        req.user=user;
                            next()    
                    }
                }
                
            }else
            {
                next(new Error("invalid token" , {cause:404}))
            }
            
       
    })

}


import { userModel } from "../../../../DB/models/user/userModel.js";
import { productModel } from "../../../../DB/models/product/productModel.js";
import { asyncHandler } from "../../../service/asyncHandler.js";

export const add = asyncHandler(async(req,res,next)=>
{
    let{product_id}=req.params 
    const product = await productModel.findById(product_id);
    if (!product) 
    {
        return next(new Error("product not found" , {cause:400}))    
    }

    let user = await userModel.findByIdAndUpdate(req.user._id,
        {
            $addToSet:{wish_list:product_id},
        },{new:true})

    res.status(201).json({message:"done", user});    
});

export const remove = asyncHandler(async(req,res,next)=>
{
    let {product_id}=req.params;

    let product = await productModel.findById(product_id);
    if (!product) 
    {
        return next(new Error("product not found" , {cause:400}));    
    }

    const user = await userModel.findByIdAndUpdate(req.user._id,
        {
            $pull:{wish_list:product_id},
        
        },{new:true});

    res.status(201).json({message:"done" , user})    


});
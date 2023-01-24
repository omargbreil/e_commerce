import e from "express";
import slugify from "slugify";
import { couponModel } from "../../../../DB/models/coupon/couponModel.js";
import { asyncHandler } from "../../../service/asyncHandler.js";



export const createCoupon= asyncHandler(async(req,res,next)=>
{
   let {coupon_name , amount , expireIn}=req.body 
   let createdCoupon = await couponModel({coupon_name , amount , expireIn,createdBy:req.user._id}).save();

   res.status(201).json({message:"done" , createdCoupon})
});


export const updateCoupon = asyncHandler(async(req,res,next)=>
{
    let {name}=req.params
    let coupon = await couponModel.findOne({coupon_name:name})
    if (!coupon) 
    {   
        return next(new Error("coupon not fount" , {cause:400}));
    }
    let new_coupon_name, amount ,expireIn ,slug;



    if (req.body.new_coupon_name) 
    {
        let check = await couponModel.findOne({coupon_name:req.body.new_coupon_name});
        if (check) 
        {
            return next(new Error("this name is already used" , {cause:404}))
        }

        new_coupon_name=req.body.new_coupon_name;
    
    }else
    {
        new_coupon_name=coupon.coupon_name;
        
    }

    slug=slugify(new_coupon_name , "_");

    if(req.body.amount)
    {
        amount=req.body.amount
    }else
    {
        amount = coupon.amount
    }
    if (req.body.expireIn) 
    {
        expireIn=req.body.expireIn    
    }else
    {
        expireIn=coupon.expireIn
    }

    let updatedCoupon = await couponModel.findOneAndUpdate({coupon_name:name},
        {
            coupon_name:new_coupon_name,
            slug,amount,expireIn,
            updatedBy:req.user._id         
        },{new:true})

        res.status(200).json({message:"done" , updatedCoupon})

});

export const stopCoupon = asyncHandler(async(req,res,next)=>
{
    let{couponId}=req.params;
    let coupon = await couponModel.findById(couponId); 
    if (!coupon) 
    {
        return next(new Error("coupon not found") , {cause:400})    
    }

    let updatedCoupon = await couponModel.findByIdAndUpdate(couponId,
        {
            is_stopped:true,
            stoppeddBy:req.user._id
        },{new:true});

    res.status(200).json({message:"done", updatedCoupon});    
})


import { subcategoryModel } from "../../../../DB/models/subcategory/subcategorymodel.js";
import { asyncHandler } from "../../../service/asyncHandler.js";
import cloudinary from "../../../service/cloudinary.js";
import slugify from "slugify";

export const addSubCategory =asyncHandler(async(req,res,next)=>
{
    let id=req.user._id;
    let {category_id}=req.params
    let {subcategory_name} =req.body;
    let slug = slugify(subcategory_name , "_")
    

    if (!req.file) 
    {
        next(new Error("you have to upload the image",{cause:404}));   
    }else
    {
                
        let {secure_url, public_id}=await cloudinary.uploader.upload(req.file.path,
            {
                folder:`category/subcategory`
            })
        let subcategory=await subcategoryModel({subcategory_name ,slug,
            subcategory_image:secure_url,createdBy:id,category_id,img_publicId:public_id}).save();

        res.status(201).json({message:"done" , subcategory});
    
    }
});

export const updateSubcatgory=asyncHandler(async(req,res,next)=>
{
    let{subcId}=req.params;

    let subcategory = await subcategoryModel.findById(subcId)
    console.log(subcategory);
    if (!subcategory) 
    {
        next(new Error("subcategory not found" ,{cause:404}))
    }else
    {
        let imgUrl;
        let subcategory_name;
        let slug;
        let new_public_id;
        if (req.file) 
        {
            await cloudinary.uploader.destroy(subcategory.img_publicId);
            let{secure_url ,public_id}= await cloudinary.uploader.upload(req.file.path,
                {
                    folder:"category/subcategory"
                });
             imgUrl = secure_url;   
             new_public_id=public_id
        }else
        {
            imgUrl=subcategory.subcategory_image
        }
        if (!req.body.subcategory_name) 
        {
            subcategory_name=subcategory.subcategory_name
        }else
        {
            subcategory_name=req.body.subcategory_name;
            slug=slugify(subcategory_name,"_");
            
        }
    let updatedSubcategory = await subcategoryModel.findByIdAndUpdate(subcId,
        {
            subcategory_image:imgUrl,
            subcategory_name,
            slug,
            img_publicId:new_public_id
        },{new:true});
        
        res.status(200).json({message:"done" , updatedSubcategory})
    }
    
    
});

export const getAllsubCategory = asyncHandler(async(req,res,next)=>
{
    let subcategories = await subcategoryModel.find({}).populate(
        [
            {
                path:"category_id",
                select:"category_name",
                populate:
                {
                    path:"createdBy",
                    select:"user_name email"
                }
            },
            {
                path:"createdBy",
                select:"user_name email"
            }
        ]
    );

    res.status(200).json({message:"done" , subcategories})
});


export const getSubcategory = asyncHandler(async(req,res,next)=>
{
    let{subcId}=req.params;

    let subcategory = await subcategoryModel.findById(subcId).populate(
        [
            {
                path:"category_id",
                select:"category_name",
                populate:
                {
                    path:"createdBy",
                    select:"user_name email"
                }
            },
            {
                path:"createdBy",
                select:"user_name email"
            }
        ])

    if (!subcategory) 
    {
        next(new Error("subCategory not found" , {cause:404}))    
    }else
    {
        res.status(200).json({message:"done" , subcategory})
    }
})

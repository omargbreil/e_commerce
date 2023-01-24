import slugify from "slugify";
import {categoryModel} from "../../../../DB/models/category/categoryModel.js";
import { asyncHandler } from "../../../service/asyncHandler.js";
import cloudinary from "../../../service/cloudinary.js";



export const addCategory =asyncHandler(async(req,res,next)=>
{
    let id=req.user._id
    let {category_name} =req.body;
    let slug = slugify(category_name,"_")

    if (!req.file) 
    {
        next(new Error("you have to upload the image",{cause:404}));   
    }else
    {
                
        let {secure_url , public_id}=await cloudinary.uploader.upload(req.file.path,
            {
                folder:`category`
            })
        let category=await categoryModel({category_name ,slug,category_image:secure_url,
            createdBy:id ,img_publicId:public_id}).save();
        res.status(201).json({message:"done" , category});
    
    }
});

export const updateCatgory=asyncHandler(async(req,res,next)=>
{
    let {id} = req.params;

    let category = await categoryModel.findById(id);
    if (!category) 
    {
        next(new Error("category not found" ,{cause:404}))
    }else
    {
        let imgUrl;
        let category_name;
        let slug;
        let new_public_id;
        if (req.file) 
        {
            await cloudinary.uploader.destroy(category.img_publicId);
            let{secure_url , public_id}= await cloudinary.uploader.upload(req.file.path,
                    {
                    folder:"category"
                });
             imgUrl = secure_url; 
             new_public_id =public_id 
        }else
        {
            imgUrl=category.category_image
        }
        if (!req.body.category_name) 
        {
            category_name=category.category_name
        }else
        {
            category_name=req.body.category_name;
            slug=slugify(category_name,"_");
            
        }
    let updatedCategory = await categoryModel.findByIdAndUpdate(id,
        {
            category_image:imgUrl,
            category_name,
            slug,
            img_publicId:new_public_id
            
        },{new:true});
        
        res.status(200).json({message:"done" , updatedCategory})
    }
    
    
});

export const getAllCategory = asyncHandler(async(req,res,next)=>
{
    const categories = await categoryModel.find({}).populate(
        [
            {
            path:"createdBy",
            select:"user_name email",
            }
        ]
    )
    res.status(200).json({message:"done" , categories})

});

            
export const getCategory = asyncHandler(async(req,res,next)=>
{
    let {categoryId} = req.params;

    let category = await categoryModel.findOne({categoryId}).populate(
        [
            {
                path:"createdBy",
                select:"user_name email",

            }
        ]);

    if (!category) 
    {
        next(new Error("category not found" , {cause:404}))
    }else
    {
        res.status(200).json({message:"done" , category});
    }
})            

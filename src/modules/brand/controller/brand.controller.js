import { brandModel } from "../../../../DB/models/brand/brandModel.js";
import { asyncHandler } from "../../../service/asyncHandler.js";
import cloudinary from "../../../service/cloudinary.js";
import slugify from "slugify";



export const addBrand=asyncHandler(async(req,res,next)=>
{
    let{brand_name}=req.body;
    let slug =slugify(brand_name,"_")
    
   if (!req.file) 
   {
     next(new Error("you have to upload the image" , {cause:404}))
   }else
   {
    let {secure_url , public_id}=await cloudinary.uploader.upload(req.file.path,
        {
            folder:"brand"
        });

    let addedBrand= await brandModel({brand_name , slug ,brand_image:secure_url,
         createdBy:req.user._id ,img_publicId:public_id}).save();

    res.status(201).json({message:"done",addedBrand})   
   }  
    

});


export const  updateBrand = asyncHandler(async(req,res,next)=>
{
    let{brandId} = req.params;

    let brand = await brandModel.findById(brandId);


    if (!brand) 
    {
        next(new Error("brand not found" , {cause:404}));
    }else
    {
        let imgUrl;
        let brand_name;
        let slug;
        let new_public_id;
        if (!req.file) 
        {
            imgUrl=brand.brand_image;    
        }else
        {
            await cloudinary.uploader.destroy(brand.img_publicId);
            let{secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,
                {
                    folder:"brand"
                });
             imgUrl = secure_url;
              new_public_id = public_id

        }

        if (!req.body.brand_name) 
        {
            brand_name = brand.brand_name;    
        }else
        {
            brand_name =req.body.brand_name;
            slug=slugify(brand_name ,"_")
        }

        let updatedBrand = await brandModel.findByIdAndUpdate(brandId,
            {
                brand_image:imgUrl,
                brand_name,
                slug,
                img_publicId:new_public_id
            },{new:true});
            
            res.status(200).json({message:"done" , updatedBrand})

    }

});

export const getAllBrands = asyncHandler(async(req,res,next)=>
{
    let brands = await brandModel.find({}).populate(
        [
            {
              
                    path:"createdBy",
                    select:"user_name email"
                
            },
           
        ]
    );

    res.status(200).json({message:"done" , brands})
});


export const getbrand = asyncHandler(async(req,res,next)=>
{
    let{brandId}=req.params;

    let brand = await brandModel.findById(brandId).populate(
        [
            {
               
                    path:"createdBy",
                    select:"user_name email"
              
            }
          
        ]);


    if (!brand) 
    {
        next(new Error("brand not found" , {cause:404}))    
    }else
    {
        res.status(200).json({message:"done" , brand})
    }
})

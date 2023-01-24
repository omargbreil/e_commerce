import slugify from "slugify";
import { brandModel } from "../../../../DB/models/brand/brandModel.js";
import {productModel} from "../../../../DB/models/product/productModel.js";
import { subcategoryModel } from "../../../../DB/models/subcategory/subcategoryModel.js";
import { asyncHandler } from "../../../service/asyncHandler.js";
import cloudinary from "../../../service/cloudinary.js";





export const addProduct=asyncHandler(async(req,res,next)=>
{
    let{category_id , subcategory_id ,brand_id} = req.params;

    let subcategory = await subcategoryModel.findOne({_id:subcategory_id,category_id});

    if (!subcategory) 
    {
        next(new Error("not found" , {cause:404}))    
    }else
    {
        let brand = await brandModel.findById(brand_id);
        if (!brand) 
        {
            next(new Error("brand not found",{cuase:404}))    
        }else
        {
            if (!req.files?.length) 
            {
                next(new Error("you have to upload images",{cuase:400}));    
            }else
            {
                let final_price;
                let solid_items=0;
                let createdBy = req.user._id;

                let{product_name,description ,total_items,discount,price,color}=req.body;
                let slug = slugify(product_name,"_");
                
                let stock = total_items-solid_items;
                final_price = price-((price*discount||0)/100)

                let product_images=[];
                let images_publicId=[];

                for (const file of req.files) 
                {
                    let {secure_url , public_id}=await cloudinary.uploader.upload(file.path,
                        {
                            folder:`product`
                        });
                        
                        product_images.push(secure_url);
                        images_publicId.push(public_id);
                }


                let product= await productModel(
                    {product_name,slug,description,product_images,images_publicId,stock,total_items,solid_items
                    ,price,discount,final_price,color,createdBy,category_id,subcategory_id,brand_id}).save();

                    res.status(201).json({message:"done",product})
            }
        }
    }
    
})



export const updataProduct = asyncHandler(async(req,res,next)=>
{   
    let {product_id}=req.params;
    let product= await productModel.findById(product_id);
    if (!product) 
    {
        next(new Error("product not found", {cause:400}));
    }else
    {
        let product_name , slug , total_items , current_stock, stock , final_price,price
        ,discount ,description,product_images=[],images_publicId=[];
        if (req.body.product_name) 
        {
            product_name=req.body.product_name;
        }else
        {
            product_name=product.product_name;
        }
        slug=slugify(product_name,"_");    

        
        if (req.body.total_items) 
        {
            total_items=req.body.total_items;
            current_stock= total_items - product.solid_items;
            stock = current_stock>0?current_stock:0;   
        }else
        {
            total_items=product.total_items
        }
        current_stock= total_items - product.solid_items;
        stock = current_stock>0?current_stock:0; 


        if (req.body.price&&req.body.discount) 
        {
            price=req.body.price;
            discount=req.body.discount;

            final_price=price-((price*discount)/100)    
        }else if (req.body.price) 
        {
            price=req.body.price;
            discount=product.discount
        }else if (req.body.discount) 
        {
            price=product.price;
            discount=req.body.discount;
        }else
        {
            final_price=product.final_price;
            price = product.price;
            discount=product.discount;
        }
        final_price=price-((price*discount)/100);



        if (req.body.description) 
        {
            description=req.body.description;    
        }else
        {
            description=product.description;
        }


        if (req.files?.length) 
        {
            for (const id of product.images_publicId) 
            {
                await cloudinary.uploader.destroy(id);

            }
            for (const file of req.files) 
                {
                    let {secure_url , public_id}=await cloudinary.uploader.upload(file.path,
                        {
                            folder:`product`
                        });
                        
                        product_images.push(secure_url);
                        images_publicId.push(public_id);
                }
            
        }else
        {
            product_images=product.product_images;
            images_publicId=product.images_publicId;
        }

        
        let updatedProduct = await productModel.findByIdAndUpdate(product_id,
            {
                product_name ,slug , total_items , stock , final_price,price
            ,discount ,description,product_images,images_publicId
    
            },{new:true});

        if (!updatedProduct) 
        {
            if (req.body.files?.length) 
            {
                for (const id of images_publicId) 
                {
                    await cloudinary.uploader.destroy(id);
    
                }      
            }
            
        }else
        {
            res.status(200).json({message:"done",updatedProduct})

        }   
    }
});





export const allProduct = asyncHandler(async(req,res,next)=>
{
    const products = await productModel.find({}).populate(
        [
            {
            path:"createdBy",
            select:"user_name email",
            },
            {
            path:"category_id",
            select:"category_name",
            },
            {
            path:"subcategory_id",
            select:"subcategory_name",
            },
            {
            path:"brand_id",
            select:"brand_name",
            }
        ]
    )
    res.status(200).json({message:"done" , products})
});



export const getProduct=asyncHandler(async(req,res,next)=>
{
    let{product_id}=req.params;

    const product = await productModel.findById(product_id).populate(
        [
            {
            path:"createdBy",
            select:"user_name email",
            },
            {
            path:"category_id",
            select:"category_name",
            },
            {
            path:"subcategory_id",
            select:"subcategory_name",
            },
            {
            path:"brand_id",
            select:"brand_name",
            }
        ]
    );

    if (!product) 
    {
        next(new Error("product not found" , {cause:400}))    
    }else
    {
        res.status(200).json({message:"done", product})
    }
})


    

    

   

    

    



            



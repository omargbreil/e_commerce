import { Schema, model, Types } from "mongoose";

const productSchema = new Schema(
    {
        product_name:
        {
            type:String,
            required:[true,"product name is required"],
            min:[2, "minimum length 2 char"],
            max:[20,"max length 20 char"]
        },
        slug:String,
        description:
        {
            type:String,
            required:[true,"the description is required"],
            min:[6, "minimum length 2 char"],
            max:[200,"max length 20 char"],
            trim:true


        },

        product_images:
        {
            type:[String],
            required:[true,"product images is required"]
        },
        
        images_publicId:[String],

        stock:
        {
            type:Number,
            default:0,
            required:[true,"stock is required"]

        },
        price:
        {
            type:Number,
            required:[true,"the price is required"]
        },
        discount:
        {
            type:Number
        },
        final_price:
        {
            type:Number
        },
        color:
        {
            type:[String],
            default:"normal",
        },
        size:
        {
            type:String,
            enums:["sm","md","lg","xl","free"],
            default:"free"
        },
        solid_items:
        {
            type:Number
        },
        total_items:
        {
            type:Number
        },
        
        createdBy:
        {
            type:Types.ObjectId,
            ref:"user",
            required:[true,"user id is required"]
        },
        updatedBy:
        {
            type:Types.ObjectId,
            ref:"user",
        },
        category_id:
        {
            type:Types.ObjectId,
            ref:"category",
            required:[true,"category id is required"]
        },
        subcategory_id:
        {
            type:Types.ObjectId,
            ref:"subcategory",
            required:[true,"subcategory id is required"]
        },
        brand_id:
        {
            type:Types.ObjectId,
            ref:"brand",
            required:[true,"brand id is required"]
        }

    },
    {
        timestamps:true
    });
       




export const productModel = model("product" , productSchema);
            
            
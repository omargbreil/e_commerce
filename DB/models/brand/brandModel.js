import { model , Schema } from "mongoose";

const brandSchema = new Schema(
    {
        brand_name:
        {
            type:String ,
            required:[true, 'brand name is required'],
            min:[2, "minimum 2 char"],
            max:[20 ,"max 20 char"],
            trim:true
        },
        
        slug:String,
        
        brand_image:
        {
            type:String,
            required:[true, 'image is required'],
        },
        createdBy:
        {
             type:Schema.Types.ObjectId ,required:true ,ref:"user"
        },
       
        img_publicId:String,
        
    },{timestamps:true});
    
    export const brandModel = model('brand' , brandSchema);

        


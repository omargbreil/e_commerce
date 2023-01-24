import { model , Schema } from "mongoose";

const categorySchema = new Schema(
    {
        category_name:
        {
            type:String ,
            required:[true, 'category name is required'],
            min:[2, "minimum 2 char"],
            max:[20 ,"max 20 char"],
            tirm:true
        },

        slug:String,

        category_image:
        {
            type:String,
            required:[true, 'image is required'],
        },

        img_publicId:String,

        createdBy:
        {
             type:Schema.Types.ObjectId ,required:true ,ref:"user"
        },
        
    },{timestamps:true});
    
    export const categoryModel = model('category' , categorySchema);

        


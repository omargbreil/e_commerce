import mongoose, { model , Schema } from "mongoose";

const subCategorySchema = new Schema(
    {
        subcategory_name:
        {
            type:String ,
            required:[true, 'subcategory name is required'],
            min:[2, "minimum 2 char"],
            max:[20 ,"max 20 char"],
            tirm:true
        },

        slug:String,

        subcategory_image:
        {
            type:String,
            required:[true, 'image is required'],
        },

        img_publicId:String,

        createdBy:
        {
             type:Schema.Types.ObjectId ,required:true ,ref:"user"
        },
        category_id:
        {
             type:Schema.Types.ObjectId ,required:true ,ref:"category"
        },
        
    },{timestamps:true});
    
    export const subcategoryModel = mongoose.models.subcategory||model('subcategory',subCategorySchema);

        


import { model, Schema, Types } from "mongoose";

const couponSchema = new Schema(
    {
        coupon_name:
        {
            type:String,
            required:[true,"coupon name is required"],
            min:[2,"coupon name minimun length 2 char"],
            min:[20,"coupon name mixmun length 2 char"],
            trim:true,
            unique:true,
        },
        slug:String,

        is_stopped:
        {
            type:Boolean,
            default:false
        },
        amount:
            {
            type:Number,
            min:[1,"min discount 1%"],
            mix:[100,"maxmin discount 100%"]
        },
        expireIn:
        {
            type:Date
        },

        createdBy:
        {
            type:Types.ObjectId,ref:"user",required:true
        },

        updatedBy:
        {
            type:Types.ObjectId,ref:"user"
        },

        stoppeddBy:
        {
            type:Types.ObjectId,ref:"user"
        }    

            
    },{timestamps:true}
)

export const couponModel = model("coupon" , couponSchema)
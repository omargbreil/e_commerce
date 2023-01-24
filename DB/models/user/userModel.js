import {model , Schema, Types} from "mongoose";

const userSchema = new Schema(
    {
        user_name:
        {
            type:String,
            required:[true, 'user name is required'],
            min:[2, "minimum 2 char"],
            max:[20 ,"max 20 char"]
        },
        email:
        {
            type:String,
            unique:[true, 'already register'],
            required:[true , 'email is required']
        },
        password:
        {
            type:String,
            required:[true , "password is required"]
        },
        phone:
        {
            type:Number,
            required:[true , "phone number is required"]
        },
        role:
        {
            type:String,
            default:"user",
            enum:['user' , 'admin']
        },
        active:
        {
            type:Boolean,
            default:false
        },
        is_confirmed:
        {
            type:Boolean,
            default:false
        },
        wish_list:[{type:Types.ObjectId , ref:"product"}],
        blocked:
        {
            type:Boolean,
            default:false
        },
        img:String,
        DOB:String,
    },{timestamps:true});

    export const userModel = model('user' ,userSchema);
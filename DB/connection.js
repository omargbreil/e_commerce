import mongoose from "mongoose";

export const connection = async () =>
{
    return await mongoose.connect(process.env.dbUri)
    .then(()=>console.log("database connected"))
    .catch(err=>console.log(`${err} database connection error`))
}
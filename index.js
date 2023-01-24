import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
let __direname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({path:path.join(__direname,'./.env')});    
import express from "express";
import { connection } from "./DB/connection.js";
import * as routes from "./src/modules/index.routes.js"
import { globalError } from "./src/service/asyncHandler.js";

const app = express();
app.use(express.json());

app.use(`${process.env.baseUrl}/auth` , routes.authRouter);
app.use(`${process.env.baseUrl}/user` , routes.userRouter);
app.use(`${process.env.baseUrl}/brand` , routes.brandRouter);
app.use(`${process.env.baseUrl}/product` , routes.productRouter);
app.use(`${process.env.baseUrl}/order` , routes.orderRouter);
app.use(`${process.env.baseUrl}/reviews` , routes.reviewsRouter);
app.use(`${process.env.baseUrl}/subcategory` , routes.subcategoryRouter);
app.use(`${process.env.baseUrl}/category` , routes.categoryRouter);
app.use(`${process.env.baseUrl}/coupon` , routes.couponRouter);
app.use(globalError)

connection();
let port = process.env.port
app.listen(port,()=>console.log(`server running on ${port}`));

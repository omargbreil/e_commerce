import { Router } from "express";
import { auth } from "../../middleware/authMiddleware.js";
import { multerHandleError, myMulter, validationtype } from "../../service/multer.js";
import * as controller from "./controller/subcategory.controller.js";
import { endpoint } from "./subcategory.endpoint.js";

export const subcategoryRouter = Router({mergeParams:true});



subcategoryRouter.post("/addsubcategory",auth(endpoint.addSubCategory),
myMulter(validationtype.image).single("subcategory_image")
,multerHandleError() ,controller.addSubCategory)

subcategoryRouter.put("/updatesubcategory/:subcId",auth(endpoint.updateSubCategory),
 myMulter(validationtype.image).single("subcategory_image")
,multerHandleError(),controller.updateSubcatgory);

subcategoryRouter.get("/subcategories" , auth(endpoint.addSubCategory) ,controller.getAllsubCategory)
subcategoryRouter.get("/:subcId" , auth(endpoint.addSubCategory) ,controller.getAllsubCategory)


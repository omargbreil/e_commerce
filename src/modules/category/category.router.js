import { Router } from "express";
import {auth} from "../../middleware/authMiddleware.js"
import { multerHandleError, myMulter, validationtype } from "../../service/multer.js";
import { subcategoryRouter } from "../subcategory/subcategory.router.js";
import { endPoint } from "./category.endpoint.js";
import * as categoryController from "./controller/category.controller.js";


export const categoryRouter = Router();

categoryRouter.use("/:category_id/subcategory",subcategoryRouter)


categoryRouter.post("/addCategory",auth(endPoint.addCategory),
myMulter(validationtype.image).single("category_image")
,multerHandleError(),categoryController.addCategory);

categoryRouter.put("/updatecategory/:id",auth(endPoint.updateCategory),
 myMulter(validationtype.image).single("category_image")
,multerHandleError(), categoryController.updateCatgory);


categoryRouter.get("/categories" , auth(endPoint.getCategories) ,categoryController.getAllCategory);


categoryRouter.get("/:categoryId" , auth(endPoint.getCategories) ,categoryController.getCategory)
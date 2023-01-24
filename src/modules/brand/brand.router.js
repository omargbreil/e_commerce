import { Router } from "express";
import { auth } from "../../middleware/authMiddleware.js";
import { multerHandleError, myMulter, validationtype } from "../../service/multer.js";
import { brandEndpoint } from "./controller/brand.endpoint.js";
import * as brandController from "./controller/brand.controller.js";


export const brandRouter = Router();



brandRouter.post("/addbrand" ,auth(brandEndpoint.addBrand),
myMulter(validationtype.image).single("brand_image"),multerHandleError(),brandController.addBrand);


brandRouter.put("/updatebrand/:brandId",auth(brandEndpoint.updateBrand)
,myMulter(validationtype.image).single("brand_image"),multerHandleError(),brandController.updateBrand);


brandRouter.get("/allbrands" ,auth(brandEndpoint.addBrand),brandController.getAllBrands);


brandRouter.get("/:brandId" ,auth(brandEndpoint.addBrand),brandController.getbrand);
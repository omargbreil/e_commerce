import { Router } from "express";
import { auth } from "../../middleware/authMiddleware.js";
import { multerHandleError, myMulter, validationtype } from "../../service/multer.js";
import { wishlistRouter } from "../wishlist/wishlinst.router.js";
import * as productController from "./controller/product.controller.js"
import { productEndpoint } from "./product.endpoint.js";

export const productRouter = Router();

productRouter.use("/:product_id/wishlist" , wishlistRouter)


productRouter.post("/addproduct/:category_id/:subcategory_id/:brand_id" , auth(productEndpoint.addProduct),
myMulter(validationtype.image).array("product_images" ,5),multerHandleError(),
productController.addProduct);




productRouter.put("/updateproduct/:product_id",auth(productEndpoint.updateProduct)
,myMulter(validationtype.image).array("product_images",5),multerHandleError(),productController.updataProduct);



productRouter.get("/allproducts",auth(productEndpoint.addProduct),productController.allProduct);
productRouter.get("/:product_id",auth(productEndpoint.addProduct),productController.getProduct);
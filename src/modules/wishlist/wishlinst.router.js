import { Router } from "express";
import { auth } from "../../middleware/authMiddleware.js";
import * as wishlistController from "./controller/wishlist.controller.js"
import { wishlistEndpoint } from "./wishlist.endpoint.js";

export const wishlistRouter = Router({mergeParams:true});

wishlistRouter.put("/add",auth(wishlistEndpoint.add) , wishlistController.add)
wishlistRouter.put("/remove",auth(wishlistEndpoint.remove) , wishlistController.remove)

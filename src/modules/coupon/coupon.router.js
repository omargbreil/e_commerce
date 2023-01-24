import { Router } from "express";
import { auth } from "../../middleware/authMiddleware.js";
import { couponEndpoint } from "./coupon.endpoint.js";
import * as couponController from "./controller/coupon.controller.js"

export const couponRouter = Router();


couponRouter.post("/createcoupon", auth(couponEndpoint.create), couponController.createCoupon);
couponRouter.put("/updatecoupon/:name", auth(couponEndpoint.update), couponController.updateCoupon);
couponRouter.patch("/stopcoupon/:couponId", auth(couponEndpoint.update), couponController.stopCoupon);
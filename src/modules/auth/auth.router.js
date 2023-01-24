import { Router } from "express";
import * as registerController from "./controller/registration.js";
import * as authController from "./controller/auth.controller.js";
import {auth} from "../../middleware/authMiddleware.js"
import { endPoint } from "./auth.endPoint.js";
import { validation } from "../../middleware/validationMiddleware.js";
import { signUpValidation } from "./auth.validation.js";



export const authRouter = Router();

 authRouter.post("/signup" ,validation(signUpValidation),  registerController.signUp);
 authRouter.get("/confirmEmail/:token" , registerController.confirmEmail);
 authRouter.post("/signIn" , registerController.signIn);  
 authRouter.put("/updaterole" , auth(endPoint.updateRole) , authController.updateRole);   
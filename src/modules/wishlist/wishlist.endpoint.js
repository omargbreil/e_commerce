import { roles } from "../../middleware/authMiddleware.js";

export const wishlistEndpoint = 
{
    add:[roles.admin,roles.user],
    remove:[roles.admin ,roles.user]
}
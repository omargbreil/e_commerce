import { roles } from "../../middleware/authMiddleware.js";

export const productEndpoint=
{
    addProduct:[roles.user,roles.admin],
    updateProduct:[roles.admin],

}
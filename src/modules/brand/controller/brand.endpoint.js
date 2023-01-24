import { roles } from "../../../middleware/authMiddleware.js";


export const brandEndpoint=
{
    addBrand:[roles.admin,roles.user],
    updateBrand:[roles.admin]
}
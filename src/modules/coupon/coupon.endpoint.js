import { roles } from "../../middleware/authMiddleware.js";

export const couponEndpoint=
{
    create:[roles.admin],
    update:[roles.admin]
}
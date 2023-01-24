import { roles } from "../../middleware/authMiddleware.js";


export const endPoint =
{
    addCategory:[roles.user , roles.admin],
    updateCategory:[roles.admin],
    getCategories:[roles.admin , roles.user]
}
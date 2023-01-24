import { roles } from "../../middleware/authMiddleware.js";

export const endpoint=
{
    addSubCategory:[roles.user , roles.admin],
    updateSubCategory:[roles.admin]

}
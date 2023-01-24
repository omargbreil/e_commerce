
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __direname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({path:path.join(__direname ,'../../.env')});

import cloudinary from "cloudinary";

cloudinary.v2.config(
    {
        cloud_name:process.env.cloudinaryName,
        api_key:process.env.cloudinaryKey,
        api_secret:process.env.cloudinarySecret
    }
);

export default cloudinary.v2;

import joi from "joi";

export const signUpValidation =
{
    body: joi.object().required().keys(
        {
            user_name: joi.string().min(2).max(10).required().messages(
                {
                    "string.min":"not matched pattern",
                    "string.empty":"not matched pattern",
                    "string.max":"not matched pattern"
                }
            ),
            email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages(
                {
                    "string.pattern.base":"not matched pattern"
                }
            ),
            cpassword: joi.valid(joi.ref("password")).required().messages(
                {
                    "any.only":"not matched"
                }
            ),
            phone:joi.number().required()


        }

    )
} 


import {StatusCodes , getReasonPhrase} from "http-status-codes";

export const validation = (Schema)=>
{
    return (req,res,next)=>
    {
        let validationTypes = ["body" , "query" , "params" , "headers"];
        let validationError =[];

        validationTypes.forEach(key=>
            {
                if (Schema[key]) 
                {
                    let valid = Schema[key].validate(req[key] , {abortEarly:false});
                    if(valid.error)
                    {
                        validationError.push(valid.error.details);

                    }   
                }
            });

            if (validationError.length) 
            {
                let state = StatusCodes.BAD_REQUEST
                res.status(state).json({message:"validationError" , error:validationError ,status:getReasonPhrase(state)});    
            }else
            {
                next()
            }
    }
}
import {z} from 'zod'

const RegisterUserSchema = z.object({
    firstName:z.string({required_error:"first name is required"})
    .trim()
    .min(2,{message:"fisrt name must be at least 2 characters"})
    .max(50),

    lastName:z.string()
    .trim()
    .min(2)
    .max(50)
    .optional(),

    username:z.string({required_error:"username is required"})
    .trim()
    .min(3,{message:"username must be at least 3 characters"})
    .max(30,{message : "username must not be more than 255 characters long"})
    .regex(/^[a-zA-Z0-9_]+$/,{message: "username can only contain letters, numbers, underscore"}),
    
    email:z.email()
    .trim(),

    password:z.string({required_error: "Password is required" })
    .min(8,{message:"password must be atleast 8 characters"})
    .max(100)
    .regex(/[0-9]/, {message:"password must contain at least one number"}),
})

async function RegisterUserValidate (req,res,next){
    try{
        const parseBody = await RegisterUserSchema.safeParseAsync(req.body);
        req.body=parseBody;
        next();
    }catch(err){
        res.status(400).json({msg: err.issues[0].message});
    }
};

export default RegisterUserValidate;
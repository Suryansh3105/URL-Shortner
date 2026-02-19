import { registerUser } from "../services/authService.js";

async function signUp(req,res){
    try{
    const {firstName,username,lastName,email,password}=req.body;
    const user = await registerUser(firstName,username,lastName,email,password);
    res.status(201).json({success:true, data:{
        id:user.id
    },
    });
    }catch(err){
        if (err.message === "Email already registered") {
      return res.status(409).json({
        success: false,
        message: err.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
    }
}

export default {
    signUp
}
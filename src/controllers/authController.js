import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";


const register = async (req ,res) =>{
    
    const {name , email , password } = req.body;

    if(!name || !email || !password){
    
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    const existingUser = await User.findOne({email}) ;

    if(existingUser){
        return res.status(409).json({
            success: false,
            message: "User already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,

    })

    const token = generateToken(user._id);

    return res.status(201).json({
        success: true,
        message: "User registered successfully",
        token, 
        user:{
            id: user._id,
            name: user.name,
            email: user.email,
        }
    })

  
     
  

};

export { register }; 
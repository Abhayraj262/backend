import jwt from "jsonwebtoken";



const authMiddleware = async (req,res,next)=> {
      
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;


    if(!token){
        return  res.status(401).json({
            success: false,
            message: " Access denied. No token provided."
        })
    }



    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);

        req.user = decoded.userId;
    }
    
catch (error) {
    return res.status(401).json({
        success: false,
        message: "Invalid or Expired Token."
    });
}

    next();

}

export default authMiddleware;
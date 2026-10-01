


const authMiddleware = async (req,res,next)=> {
      
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;


}

export default authMiddleware;
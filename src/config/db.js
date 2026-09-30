import mongoose from "mongoose";

const connectDB  =  async () =>{

    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    
    }
    catch(error){
       console.error("MongoDB error:", error.message);
       throw new Error("mongoDB connection failed");
    }
};

export default connectDB;
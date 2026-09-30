import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type : String,
            requird: true,
            trim: true,
        },

        email: {
            type : String,
            requird : true,
            trim: true,
            unique:true,
            lowercase:true,
        },
        password: {
          type:String,
          required:true,
         minlength:4,
        }
    },
    {
        timestamps:true,
    }

);

const User= mongoose.model("User",userSchema);

export default User;
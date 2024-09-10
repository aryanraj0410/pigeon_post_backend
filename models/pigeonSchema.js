import mongoose from "mongoose";

const pigeonSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    like:{
        type:Array,
        default:[]
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    userDetails:{
        type:Array,
        default:[]
    },
},{timestamps:true});
export const Pigeon= mongoose.model("Tweet", pigeonSchema);
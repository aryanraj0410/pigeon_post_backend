
import {Pigeon} from "../models/pigeonSchema.js";
import { User } from "../models/userSchema.js";

export const createPigeon = async (req, res) => {
    try {
        const { description, id } = req.body;
        if (!description || !id) {
            return res.status(401).json({
                message: "Fields are required.",
                success: false
            });
        };
        const user = await User.findById(id).select("-password");
        await Pigeon.create({
            description,
            userId:id,
            userDetails:user
        });
        return res.status(201).json({
            message:"Pigeon created successfully.",
            success:true,
        })
    } catch (error) {
        console.log(error);
    }
}
export const deletePigeon = async (req,res) => {
    try {
        const {id}  = req.params;
        await Pigeon.findByIdAndDelete(id);
        return res.status(200).json({
            message:"Pigeon deleted successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const likeOrDislike = async (req,res) => {
    try {
        const loggedInUserId = req.body.id;
        const pigeonId = req.params.id;
        const pigeon= await Pigeon.findById(pigeonId);
        if(pigeon.like.includes(loggedInUserId)){
            // dislike
            await Pigeon.findByIdAndUpdate(pigeonId,{$pull:{like:loggedInUserId}});
            return res.status(200).json({
                message:"User disliked your Pigeon."
            })
        }else{
            // like
            await Pigeon.findByIdAndUpdate(pigeonId, {$push:{like:loggedInUserId}});
            return res.status(200).json({
                message:"User liked your Pigeon."
            })
        }
    } catch (error) {
        console.log(error);
    }
};
export const getAllPigeons = async (req,res) => {
    // loggedInUser ka tweet + following user tweet
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id);
        const loggedInUserPigeon = await Pigeon.find({userId:id});
        const followingUserPigeon = await Promise.all(loggedInUser.following.map((otherUsersId)=>{
            return Pigeon.find({userId:otherUsersId});
        }));
        return res.status(200).json({
            pigeon:loggedInUserPigeon.concat(...followingUserPigeon),
        })
    } catch (error) {
        console.log(error);
    }
}
export const getFollowingPigeons = async (req,res) =>{
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id); 
        const followingUserPigeon = await Promise.all(loggedInUser.following.map((otherUsersId)=>{
            return Pigeon.find({userId:otherUsersId});
        }));
        return res.status(200).json({
            pigeon:[].concat(...followingUserPigeon)
        });
    } catch (error) {
        console.log(error);
    }
}
 
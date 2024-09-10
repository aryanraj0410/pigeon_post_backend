import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../config/.env" });

//console.log("MONGO_URI from.env:", process.env.MONGO_URI); // Debugging

const databaseConnection = () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Connected to mongoDB");
    }).catch((error) => {
        console.log(error);
    });
};

export default databaseConnection;

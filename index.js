import express, { request } from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import pigeonRoute from "./routes/pigeonRoute.js";



dotenv.config({
    path:".env"
})
databaseConnection();
const app = express();

// middlewares
app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());
app.use(cookieParser());

//routes

app.use("/api/v1/user", userRoute);
app.use("/api/v1/pigeon", pigeonRoute);

app.listen(process.env.PORT,() => {
    console.log(`Server listen at port ${process.env.PORT}`);
})
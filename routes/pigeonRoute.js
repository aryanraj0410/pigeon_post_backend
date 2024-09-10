import express from "express";
import isAuthenticated from "../config/auth.js";
import { deletePigeon, likeOrDislike, createPigeon, getAllPigeons, getFollowingPigeons } from "../controllers/pigeonController.js";

const router = express.Router();
 
router.route("/create").post(isAuthenticated, createPigeon);
router.route("/delete/:id").delete(isAuthenticated, deletePigeon);
router.route("/like/:id").put(isAuthenticated, likeOrDislike);
router.route("/allpigeons/:id").get(isAuthenticated, getAllPigeons);
router.route("/followingpigeons/:id").get(isAuthenticated, getFollowingPigeons);
export default router;
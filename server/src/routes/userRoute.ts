import express from "express";
import {
  getAllUsers,
  createUser,
  loginUser,
  getDashboard,
  getUserProfile,
} from "../controller/authController";

const router = express.Router();

// create a new user
router.post("/login", loginUser);
router.post("/users", createUser);
router.get("/users", getAllUsers);
router.get("/dashboard", getDashboard);
router.get("/userprofile", getUserProfile);

export default router;

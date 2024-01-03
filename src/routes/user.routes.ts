import express from "express";
import { CreateUser, GetAllUsers } from "../controller/user.controller";
const router = express.Router();

router.post("/create", CreateUser);
router.get("/", GetAllUsers);
export default router;

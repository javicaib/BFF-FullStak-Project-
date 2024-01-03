import express from "express";
import { Login } from "../controller/auth.crontroller";
const router = express.Router();

router.post("/login", Login);

export default router;

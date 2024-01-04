import express from "express";
import { Login } from "../controller/auth.crontroller";
import { GetMe } from "../controller/user.controller";
import check_auth from "../middlewares/auth.middleware";
const router = express.Router();

router.post("/login", Login);
router.post("/me", check_auth, GetMe);

export default router;

import { Response } from "express";
import { compare } from "../helpers/encodePassword";
import { generateJWT } from "../helpers/token";
import { CustomRequest } from "../middlewares/auth.middleware";
import User from "../models/user.model";

export const Login = async (req: CustomRequest, res: Response) => {
  console.log(req.decoded);
  const { password, email } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: req.t("email-password-required") });
  }
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ msg: req.t("email-password-incorrect") });
  }

  const comparePasswords = await compare(String(password), user.password);
  if (!comparePasswords) {
    return res.status(400).json({ msg: req.t("email-password-incorrect") });
  }

  const { name, lastName } = user;
  const access_token = generateJWT(
    user.id,
    user.name,
    user.lastName,
    user.email
  );
  return res.status(200).json({
    name,
    lastName,
    email,
    access_token,
  });
};

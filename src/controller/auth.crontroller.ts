import { Request, Response } from "express";
import { compare } from "../helpers/encodePassword";
import User from "../models/user.model";
import { generateJWT } from "../helpers/token";
export const Login = async (req: Request, res: Response) => {
  const { password, email } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Email y Password son requeridos" });
  }
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ msg: "Usuario no encontrado" });
  }

  const comparePasswords = await compare(String(password), user.password);
  if (!comparePasswords) {
    return res.status(400).json({ msg: "Email o Password incorrectos" });
  }

  const { name, lastName } = user;
  const access_token = generateJWT(user.id);
  return res.status(200).json({
    name,
    lastName,
    email,
    access_token,
  });
};

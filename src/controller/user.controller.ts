import { Request, Response } from "express";
import { hashedPassword } from "../helpers/encodePassword";
import { CustomRequest } from "../middlewares/auth.middleware";
import User from "../models/user.model";

export const CreateUser = async (req: Request, res: Response) => {
  const { name, lastName, password, password2, email } = req.body;
  if (password !== password2) {
    return res.status(400).send({ msg: "Password must be match" });
  }
  const hash = await hashedPassword(String(password));
  const user = new User({ name, lastName, password: hash, email });

  return user
    .save()
    .then(() => {
      return res.status(201).json({
        name,
        lastName,
        email,
      });
    })
    .catch((err) => {
      return res.status(400).json({ message: err.name });
    });
};

export const GetAllUsers = (req: Request, res: Response) => {
  User.find({})
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => console.log(err));
};

export const GetMe = (req: CustomRequest, res: Response) => {
  return res.send(req.decode);
};

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getSecretWord } from "../helpers/token";
import User from "../models/user.model";


const check_auth = async (req: Request, res: Response, next: NextFunction) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.toLocaleLowerCase().startsWith("bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, getSecretWord());
      if (typeof decode !== 'string') {
        const user = await User.findById(decode.id)
        if (!user) {
          return res.status(401).json({ msg: req.t("invalid-token") });
        }
        req.user = decode
        return next()
      }

      return res.status(401).json({ msg: req.t("invalid-token") });
    } catch (error) {
      console.log(error)
      return res.status(401).json({ msg: req.t("invalid-token") });
    }
  }

  return res.status(401).json({ msg: req.t("no-auth-token") });
};
export default check_auth;

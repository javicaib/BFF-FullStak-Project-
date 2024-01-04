import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getSecretWord } from "../helpers/token";

export interface CustomRequest extends Request {
  decoded?: any; // Tipo de la información decodificada
  t: any;
}

const check_auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.toLocaleLowerCase().startsWith("bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, getSecretWord());
      req.decoded = decode;

      return next();
    } catch (error) {
      return res.status(401).json({ msg: req.t("invalid-token") });
    }
  }

  return res.status(401).json({ msg: req.t("no-auth-token") });
};
export default check_auth;

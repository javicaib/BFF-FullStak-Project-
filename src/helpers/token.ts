import dontevn from "dotenv";
import jwt from "jsonwebtoken";

dontevn.config();
const token = process.env.JWT_TOKEN;
const expires = process.env.JWT_EXPIRE;

export const generateJWT = (id: String): string => {
  if (!token) {
    throw new Error("JWT_TOKEN is not defined in the environment variables");
  }
  return jwt.sign({ id }, token, { expiresIn: expires });
};

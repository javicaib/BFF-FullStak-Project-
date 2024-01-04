import dontevn from "dotenv";
import jwt from "jsonwebtoken";

dontevn.config();

const expires = process.env.JWT_EXPIRE;

export const getSecretWord = () => {
  const token = process.env.JWT_TOKEN;
  if (!token) {
    throw new Error("JWT_TOKEN is not defined in the environment variables");
  }
  return token;
};

export const generateJWT = (
  id: string,
  name: string,
  lastName: string,
  email: string
): string => {
  return jwt.sign({ id, name, lastName, email }, getSecretWord(), {
    expiresIn: expires,
  });
};

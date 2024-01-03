import bcrypt from "bcrypt";

export const hashedPassword = async (password: string) => {
  return await bcrypt
    .genSalt(10)
    .then((buffer) => {
      return bcrypt.hash(password, buffer);
    })
    .catch((err) => console.log(err));
};

export const compare = async (uncryptedPassword: string,password: string) => {
  return await bcrypt.compare(uncryptedPassword,password)
};

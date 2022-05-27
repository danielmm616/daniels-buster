import { IUserLogin } from "../../interfaces/user";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/appError";

const userLoginService = async ({ email, password }: IUserLogin) => {
  if (!email || !password) {
    let missingField = email === undefined ? "email" : "password";
    throw new AppError(400, `${missingField} is a required field`);
  }

  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const { ...user } = users.find((user) => user.email === email);

  if (!user) {
    throw new AppError(401, "Wrong email/password");
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw new AppError(401, "Wrong email/password");
  }

  const { cart, ...userWithoutCart } = user;

  const token = jwt.sign(
    { ...userWithoutCart },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );

  return token;
};

export default userLoginService;

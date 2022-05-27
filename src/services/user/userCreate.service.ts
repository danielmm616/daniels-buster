import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { Cart } from "../../entities/cart.entity";
import { IUserCreate } from "../../interfaces/user";
import { User } from "../../entities/user.entity";
import * as bcrypt from "bcrypt";

const userCreateService = async ({
  name,
  email,
  password,
  isAdmin = false,
}: IUserCreate) => {
  const userRepository = AppDataSource.getRepository(User);
  const cartRepository = AppDataSource.getRepository(Cart);

  const users = await userRepository.find();

  const emailAlreadyExists = users.find((user) => user.email === email);

  if (emailAlreadyExists) {
    throw new AppError(409, `Key (email)=(${email}) already exists`);
  }

  const cart = new Cart();
  cart.paid = false;
  cart.total = 0;
  cart.dvds = [];

  cartRepository.create(cart);
  await cartRepository.save(cart);

  const user = new User();
  user.name = name;
  user.email = email;
  user.password = await bcrypt.hash(password, 10);
  user.isAdmin = isAdmin;
  user.cart = cart;

  userRepository.create(user);
  await userRepository.save(user);

  return user;
};

export default userCreateService;

import { Cart } from "../../entities/cart.entity";
import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";

const cartPayService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError(404, "user not found");
  }

  const cartRepository = AppDataSource.getRepository(Cart);
  const cart = await cartRepository.findOne({
    where: { id: user.cart.id },
  });

  if (!cart) {
    throw new AppError(404, "cart not found");
  }

  cart.paid = true;

  await cartRepository.save(cart);

  return cart;
};

export default cartPayService;

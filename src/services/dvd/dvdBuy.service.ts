import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { Cart } from "../../entities/cart.entity";
import { Stock } from "../../entities/stock.entity";
import { Dvd } from "../../entities/dvd.entity";
import { fixedFloat } from "../../utils";
import { IDvdBuy } from "../../interfaces/dvd";
import { User } from "../../entities/user.entity";

const dvdBuyService = async ({ dvdId, quantity, userId }: IDvdBuy) => {
  const dvdRepository = AppDataSource.getRepository(Dvd);
  const dvd = await dvdRepository.findOne({
    where: { id: dvdId },
  });

  if (!dvd) {
    throw new AppError(404, "dvd not found");
  }

  const stockRepository = AppDataSource.getRepository(Stock);
  const stock = await stockRepository.findOne({
    where: { id: dvd.stock.id },
  });

  if (!stock) {
    throw new AppError(404, "stock not found");
  }

  if (quantity > stock.quantity) {
    throw new AppError(
      422,
      `current stock is ${dvd.stock.quantity}, received demand ${quantity}`
    );
  }

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError(404, "user not found");
  }

  const cartRepository = AppDataSource.getRepository(Cart);
  const cart = await cartRepository.findOne({
    where: { id: user?.cart.id },
  });

  if (!cart) {
    throw new AppError(404, "cart not found");
  }

  const dvdAlreadyInCart = cart.dvds.find((dvd) => dvd.id === dvdId);

  if (dvdAlreadyInCart) {
    throw new AppError(409, "dvd already in cart");
  }

  cart.paid = false;
  cart.dvds = [dvd];
  cart.total = fixedFloat(stock.price * quantity);

  await cartRepository.save(cart);
  await userRepository.save(user);

  stock.quantity = stock.quantity - quantity;

  await stockRepository.save(stock);
  await dvdRepository.save(dvd);

  return cart;
};

export default dvdBuyService;

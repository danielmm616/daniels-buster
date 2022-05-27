import { AppDataSource } from "../../data-source";
import { Dvd } from "../../entities/dvd.entity";
import { Stock } from "../../entities/stock.entity";
import { IDvdCreate } from "../../interfaces/dvd";

const dvdCreateService = async ({
  name,
  duration,
  quantity,
  price,
}: IDvdCreate) => {
  const dvdRepository = AppDataSource.getRepository(Dvd);
  const stockRepository = AppDataSource.getRepository(Stock);

  const dvd = new Dvd();
  dvd.name = name;
  dvd.duration = duration;

  const stock = new Stock();
  stock.quantity = quantity;
  stock.price = price;

  stockRepository.create(stock);
  await stockRepository.save(stock);

  dvd.stock = stock;

  dvdRepository.create(dvd);
  await dvdRepository.save(dvd);

  return dvd;
};

export default dvdCreateService;

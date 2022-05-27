import { AppDataSource } from "../../data-source";
import { Dvd } from "../../entities/dvd.entity";

const dvdListService = async () => {
  const dvdRepository = AppDataSource.getRepository(Dvd);
  const dvds = await dvdRepository.find();
  return dvds;
};

export default dvdListService;

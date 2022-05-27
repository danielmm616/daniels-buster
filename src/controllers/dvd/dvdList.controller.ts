import { Request, Response } from "express";
import dvdListService from "../../services/dvd/dvdList.service";
import { IDvd } from "../../interfaces/dvd";

const dvdListController = async (req: Request, res: Response) => {
  const dvdList: IDvd[] = await dvdListService();

  return res.status(200).json(dvdList);
};

export default dvdListController;

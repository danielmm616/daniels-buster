import { Request, Response } from "express";
import dvdCreateService from "../../services/dvd/dvdCreate.service";
import { IDvd } from "../../interfaces/dvd";
import { AppError, handleError } from "../../errors/appError";

const dvdCreateController = async (req: Request, res: Response) => {
  try {
    const { name, duration, quantity, price } = req.body;

    const dvd: IDvd = await dvdCreateService({
      name,
      duration,
      quantity,
      price,
    });

    return res.status(201).send(dvd);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default dvdCreateController;

import { Request, Response } from "express";
import dvdBuyService from "../../services/dvd/dvdBuy.service";
import { AppError, handleError } from "../../errors/appError";

const dvdBuyController = async (req: Request, res: Response) => {
  try {
    const { dvdId } = req.params;
    const { quantity } = req.body;
    const userId = req.userId;

    const cart = await dvdBuyService({ dvdId, quantity, userId });

    return res.status(201).send(cart);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default dvdBuyController;

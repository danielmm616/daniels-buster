import { Request, Response } from "express";
import cartPayService from "../../services/cart/cartPay.service";
import { AppError, handleError } from "../../errors/appError";

const cartPayController = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const cart = await cartPayService(userId);

    return res.status(201).send(cart);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default cartPayController;

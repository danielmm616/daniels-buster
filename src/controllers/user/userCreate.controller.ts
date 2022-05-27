import { Request, Response } from "express";
import userCreateService from "../../services/user/userCreate.service";
import { AppError, handleError } from "../../errors/appError";

const userCreateController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    const {
      cart,
      password: ommited,
      ...user
    } = await userCreateService({ name, email, password, isAdmin });

    return res.status(201).send(user);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default userCreateController;

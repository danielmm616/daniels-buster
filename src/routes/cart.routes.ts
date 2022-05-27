import { Router } from "express";
import { authUser } from "../middlewares/authUser";

import cartPayController from "../controllers/cart/cartPay.controller";

const routes = Router();

export const cartRoutes = () => {
  routes.put("/pay", authUser, cartPayController);

  return routes;
};

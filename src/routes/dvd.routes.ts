import { Router } from "express";
import { verifyIsAdmin } from "../middlewares/verifyIsAdmin.middleware";
import { authUser } from "../middlewares/authUser";

import dvdCreateController from "../controllers/dvd/dvdCreate.controller";
import dvdListController from "../controllers/dvd/dvdList.controller";
import dvdBuyController from "../controllers/dvd/dvdBuy.controller";

const routes = Router();

export const dvdRoutes = () => {
  routes.post("/register", verifyIsAdmin, dvdCreateController);
  routes.post("/buy/:dvdId", authUser, dvdBuyController);
  routes.get("/", dvdListController);

  return routes;
};

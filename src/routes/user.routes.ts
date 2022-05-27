import { Router } from "express";
import { verifyAdminUserCreation } from "../middlewares/verifyAdminUserCreation.middleware";

import userCreateController from "../controllers/user/userCreate.controller";
import userLoginController from "../controllers/user/userLogin.controller";

const routes = Router();

export const userRoutes = () => {
  routes.post("/register", verifyAdminUserCreation, userCreateController);
  routes.post("/login", userLoginController);

  return routes;
};

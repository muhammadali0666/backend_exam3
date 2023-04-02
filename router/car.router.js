import { Router } from "express";
import {
  createCar,
  deleteCar,
  updateCar,
  getCar,
  getCars,
} from "../controller/car.ctr.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

let CarRouter = Router();

CarRouter.get("/list", getCars);
CarRouter.post("/create", createCar);
CarRouter.post("/delete", deleteCar);
CarRouter.post("/update", updateCar);
CarRouter.get("/list/:id", getCar);

export default CarRouter;

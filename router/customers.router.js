import { Router } from "express";
import { getCustomers, createCustomers } from "../controller/customers.ctr.js";

let customersRouter = Router();

customersRouter.get("/list", getCustomers);
customersRouter.post("/create", createCustomers);



export default customersRouter;
import { Router } from "express";
import {
  createCompany,
  deleteCompany,
  updateCompany,
  getCompanies,
  getCompany,
} from "../controller/company.ctr.js";

let companyRouter = Router();

companyRouter.get("/list", getCompanies);
companyRouter.post("/create", createCompany);
companyRouter.post("/delete", deleteCompany);
companyRouter.post("/update", updateCompany);
companyRouter.get("/list/:id", getCompany);

export default companyRouter;

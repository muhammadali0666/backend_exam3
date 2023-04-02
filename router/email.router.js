import { Router } from "express";
import { createEmail, getEmails } from "../controller/email.ctr.js";

let emailRouter = Router();

emailRouter.get("/list", getEmails);
emailRouter.post("/create", createEmail);



export default emailRouter;
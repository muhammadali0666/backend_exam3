import { Router } from "express";
import { createSession, getSession, updateSession } from "../controller/session.ctr.js";

let sessionRouter = Router();

sessionRouter.get("/list", getSession);
sessionRouter.post("/create", createSession);
sessionRouter.post("/update", updateSession);



export default sessionRouter;
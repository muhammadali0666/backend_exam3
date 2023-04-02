import { Router } from "express";
import { getExtra, getExtra2, getExtra3, getExtra4, getExtra5, getExtra6 } from "../controller/extra.ctr.js";

let extraRouter = Router();

extraRouter.get("/list/:id", getExtra);
extraRouter.get("/list2/:id", getExtra2);
extraRouter.get("/list3/:id", getExtra3);
extraRouter.get("/list4/:id", getExtra4);
extraRouter.get("/list5/:id", getExtra5);
extraRouter.get("/list6/:id", getExtra6);


export default extraRouter;
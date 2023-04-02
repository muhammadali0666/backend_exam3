import { Router } from "express";
import { authRegister, loginAuth } from "../controller/registeration.ctr.js";

let registerRouter = Router();

registerRouter.post("/createRegister", authRegister);
registerRouter.post("/login", loginAuth);



export default registerRouter;
import { Router } from "express";
import {
  createUser,
  deleteUser,
  updateUser,
  getUser,
  getUsers,
} from "../controller/user.ctr.js";
// import { userValidate } from "../validation/user.validation.js";

let router = Router();

router.get("/list", getUsers);
router.post("/create", createUser);
router.post("/delete", deleteUser);
router.post("/update", updateUser);
router.get("/list/:id", getUser);

export default router;

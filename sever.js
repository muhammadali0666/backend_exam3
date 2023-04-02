import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import userRouter from "./router/users.router.js"
import companyRouter from "./router/company.router.js"
import CarRouter from "./router/car.router.js"
import customersRouter from "./router/customers.router.js"
import emailRouter from "./router/email.router.js"
import sessionRouter from "./router/session.router.js"
import authRegister from "./router/register.router.js"
import extraRouter from "./router/extra.router.js"
import { roleMiddleware } from "./middleware/role.middleware.js"


dotenv.config();
const  PORT  = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());

// router 
app.use("/cars", roleMiddleware, CarRouter)
app.use("/users", userRouter)
app.use("/company", companyRouter)
app.use("/customers", customersRouter)
app.use("/emails", emailRouter)
app.use("/session", sessionRouter)
app.use("/auth", authRegister)
app.use("/extra", extraRouter)












app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
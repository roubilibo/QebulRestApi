import { Router } from "express";
import AuthControllers from "../../controllers/customer/AuthControllers";
import Auth from "../../middlewares/Auth";

const AuthRouter = Router();

AuthRouter.post("/register", AuthControllers.registerCustomer);
AuthRouter.post("/login", AuthControllers.loginCustomer);

export default AuthRouter;

import { Router } from "express";
import CartControllers from "../../controllers/customer/CartControllers";
import Auth from "../../middlewares/Auth";

const CartRouter = Router();

CartRouter.post("/add-to-cart", Auth.authenticate, CartControllers.addToCart);

export default CartRouter;

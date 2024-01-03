import { Request, Response } from "express";
import CartServices from "../../services/customer/CartServices";

class CartControllers {
	addToCart(req: Request, res: Response): Promise<Response> {
		return CartServices.addToCart(req, res);
	}
}
export default new CartControllers();

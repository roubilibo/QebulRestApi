import { Request, Response } from "express";
import AuthServices from "../../services/customer/AuthServices";

class AuthControllers {
	registerCustomer(req: Request, res: Response): Promise<Response> {
		return AuthServices.registerCustomer(req, res);
	}
}
export default new AuthControllers();

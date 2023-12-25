import { Request, Response } from "express";
import ProductServices from "../../services/admin/ProductServices";

class productControllers {
	addProduct(req: Request, res: Response): Promise<Response> {
		return ProductServices.addProduct(req, res);
	}
	findAllProducts(req: Request, res: Response): Promise<Response> {
		return ProductServices.findAllProducts(req, res);
	}
	findOneProduct(req: Request, res: Response): Promise<Response> {
		return ProductServices.findOneProduct(req, res);
	}
	editProduct(req: Request, res: Response): Promise<Response> {
		return ProductServices.editProduct(req, res);
	}
}

export default new productControllers();

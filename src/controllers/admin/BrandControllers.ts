import { Request, Response } from "express";
import BrandServices from "../../services/admin/BrandServices";

class BrandControllers {
	addBrand(req: Request, res: Response): Promise<Response> {
		return BrandServices.addBrand(req, res);
	}
	findallBrand(req: Request, res: Response): Promise<Response> {
		return BrandServices.findAllBrand(req, res);
	}
	editBrand(req: Request, res: Response): Promise<Response> {
		return BrandServices.editBrand(req, res);
	}
	deleteBrand(req: Request, res: Response): Promise<Response> {
		return BrandServices.deleteBrand(req, res);
	}
	findOneBrand(req: Request, res: Response): Promise<Response> {
		return BrandServices.findOneBrand(req, res);
	}
}
export default new BrandControllers();

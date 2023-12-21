import { Request, Response } from "express";
import CategoryServices from "../../services/admin/CategoryServices";

class categoryControllers {
	addCategory(req: Request, res: Response): Promise<Response> {
		return CategoryServices.addCategory(req, res);
	}
	findAllCategory(req: Request, res: Response): Promise<Response> {
		return CategoryServices.findAllCategory(req, res);
	}
	findOneCategory(req: Request, res: Response): Promise<Response> {
		return CategoryServices.findOneCategory(req, res);
	}
	editCategory(req: Request, res: Response): Promise<Response> {
		return CategoryServices.editCategory(req, res);
	}
	deleteCategory(req: Request, res: Response): Promise<Response> {
		return CategoryServices.deleteCategory(req, res);
	}
}
export default new categoryControllers();

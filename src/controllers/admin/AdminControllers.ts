import { Request, Response } from "express";
import AdminServices from "../../services/admin/AdminServices";

class AdminControllers {
	createAdmin(req: Request, res: Response) {
		AdminServices.createAdmin(req, res);
	}
	loginAdmin(req: Request, res: Response) {
		AdminServices.loginAdmin(req, res);
	}
	checkAdmin(req: Request, res: Response) {
		AdminServices.checkAdmin(req, res);
	}
}

export default new AdminControllers();

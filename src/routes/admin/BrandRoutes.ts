import { Router } from "express";
import Auth from "../../middlewares/Auth";
import BrandControllers from "../../controllers/admin/BrandControllers";
import { adminRole } from "../../middlewares/athorizationRole";

const AdmBrandRouter = Router();
AdmBrandRouter.post(
	"/admin/add-brand",
	Auth.authenticate,
	adminRole,
	BrandControllers.addBrand
);
AdmBrandRouter.get("/admin/brands", BrandControllers.findallBrand);
AdmBrandRouter.patch(
	"/admin/edit-brand/:brand_id",
	Auth.authenticate,
	adminRole,
	BrandControllers.editBrand
);
AdmBrandRouter.delete(
	"/admin/delete-brand/:brand_id",
	Auth.authenticate,
	adminRole,
	BrandControllers.deleteBrand
);
AdmBrandRouter.get("/admin/brand/:brand_id", BrandControllers.findOneBrand);

export default AdmBrandRouter;

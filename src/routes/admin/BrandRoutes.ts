import { Router } from "express";
import Auth from "../../middlewares/Auth";
import BrandControllers from "../../controllers/admin/BrandControllers";

const AdmBrandRouter = Router();
AdmBrandRouter.post(
	"/admin/add-brand",
	Auth.authenticate,
	BrandControllers.addBrand
);
AdmBrandRouter.get(
	"/admin/brands",
	Auth.authenticate,
	BrandControllers.findallBrand
);
AdmBrandRouter.patch(
	"/admin/edit-brand/:brand_id",
	Auth.authenticate,
	BrandControllers.editBrand
);
AdmBrandRouter.delete(
	"/admin/delete-brand/:brand_id",
	Auth.authenticate,
	BrandControllers.deleteBrand
);
AdmBrandRouter.get(
	"/admin/brand/:brand_id",
	Auth.authenticate,
	BrandControllers.findOneBrand
);

export default AdmBrandRouter;

import { Router } from "express";
import Auth from "../../middlewares/Auth";
import CategoryControllers from "../../controllers/admin/CategoryControllers";

const AdmCategoryRouter = Router();

AdmCategoryRouter.post(
	"/admin/add-category",
	Auth.authenticate,
	CategoryControllers.addCategory
);
AdmCategoryRouter.get("/admin/categories", CategoryControllers.findAllCategory);
AdmCategoryRouter.get(
	"/admin/category/:category_id",
	CategoryControllers.findOneCategory
);
AdmCategoryRouter.patch(
	"/admin/edit-category/:category_id",
	Auth.authenticate,
	CategoryControllers.editCategory
);
AdmCategoryRouter.delete(
	"/admin/delete-category/:category_id",
	Auth.authenticate,
	CategoryControllers.deleteCategory
);
export default AdmCategoryRouter;

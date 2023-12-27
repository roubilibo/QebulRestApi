import { Router } from "express";
import Auth from "../../middlewares/Auth";
import ProductControllers from "../../controllers/admin/ProductControllers";
import uploadImage from "../../middlewares/uploadImage";
import { adminRole } from "../../middlewares/athorizationRole";

const AdmProductRouter = Router();
AdmProductRouter.post(
	"/admin/add-product",
	Auth.authenticate,
	adminRole,
	uploadImage.single("product_image"),
	ProductControllers.addProduct
);
AdmProductRouter.get("/admin/products", ProductControllers.findAllProducts);
AdmProductRouter.get(
	"/admin/product/:product_id",
	ProductControllers.findOneProduct
);
AdmProductRouter.patch(
	"/admin/edit-product/:product_id",
	Auth.authenticate,
	adminRole,
	uploadImage.single("product_image"),
	ProductControllers.editProduct
);
AdmProductRouter.delete(
	"/admin/delete-product/:product_id",
	Auth.authenticate,
	adminRole,
	ProductControllers.deleteProduct
);

export default AdmProductRouter;

import { Router } from "express";
import Auth from "../../middlewares/Auth";
import ProductControllers from "../../controllers/admin/ProductControllers";
import uploadImage from "../../middlewares/uploadImage";

const AdmProductRouter = Router();
AdmProductRouter.post(
	"/admin/add-product",
	Auth.authenticate,
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
	uploadImage.single("product_image"),
	ProductControllers.editProduct
);

export default AdmProductRouter;

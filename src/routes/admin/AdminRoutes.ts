import { Router } from "express";
import AdminControllers from "../../controllers/admin/AdminControllers";
import Auth from "../../middlewares/Auth";

const AdminRouter = Router();

AdminRouter.post("/admin/register", AdminControllers.createAdmin);
AdminRouter.post("/admin/login", AdminControllers.loginAdmin);
AdminRouter.get("/admin/check", Auth.authenticate, AdminControllers.checkAdmin);

export default AdminRouter;

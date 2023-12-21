import { AppDataSource } from "./data-source";
import * as express from "express";
import * as cors from "cors";
import Env from "./utils/env/Env";
import AdminRouter from "./routes/admin/AdminRoutes";
import AdmBrandRouter from "./routes/admin/BrandRoutes";

AppDataSource.initialize()
	.then(async () => {
		const app = express();
		const port = Env.PORT;

		const options: cors.CorsOptions = {
			allowedHeaders: [, "X-Requested-With", "Content-Type", "Authorization"],
			credentials: true,
			methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
			origin: "*",
			preflightContinue: false,
		};
		app.use(express.json());
		app.use(cors(options));

		//? Routes
		app.use("/api/v1", AdminRouter);
		app.use("/api/v1", AdmBrandRouter);

		app.listen(port, () => {
			console.log(`server is running on port ${port}`);
		});
	})
	.catch((error) => console.log(error));

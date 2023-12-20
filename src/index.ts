import { AppDataSource } from "./data-source";
import * as express from "express";
import * as cors from "cors";
import Env from "./utils/env/Env";

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

		app.listen(port, () => {
			console.log(`server is running on port ${port}`);
		});
	})
	.catch((error) => console.log(error));
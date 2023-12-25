import * as dotenv from "dotenv";
dotenv.config();

class Env {
	static PORT: number = parseInt(process.env.PORT || "5000");
	static DB_HOST: string = process.env.DB_HOST || "postgre";
	static DB_PORT: number = parseInt(process.env.DB_PORT || "5432");
	static DB_USER: string = process.env.DB_USER || "postgre";
	static DB_PASSWORD: string = process.env.DB_PASSWORD || "root";
	static DB_NAME: string = process.env.DB_NAME || null;
	static JWT_SECRET: string = process.env.JWT_SECRET || null;
	static CLOUDINARY_CLOUD_NAME: string =
		process.env.CLOUDINARY_CLOUD_NAME || null;
	static CLOUDINARY_API_KEY: string = process.env.CLOUDINARY_API_KEY || null;
	static CLOUDINARY_API_SECRET: string =
		process.env.CLOUDINARY_API_SECRET || null;
}
export default Env;

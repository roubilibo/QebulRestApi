import * as dotenv from "dotenv";
dotenv.config();

class Env {
	static PORT: number = parseInt(process.env.PORT || "3000");
	static DB_HOST: string =
		process.env.DB_HOST || "ep-plain-sun-74387267.ap-southeast-1.aws.neon.tech";
	static DB_PORT: number = parseInt(process.env.DB_PORT || "5432");
	static DB_USER: string = process.env.DB_USER || "roubilibo";
	static DB_PASSWORD: string = process.env.DB_PASSWORD || "aiMI3fnq8Kbc";
	static DB_NAME: string = process.env.DB_NAME || "db_qebul";
	static JWT_SECRET: string = process.env.JWT_SECRET || "qebul-app";
	static CLOUDINARY_CLOUD_NAME: string =
		process.env.CLOUDINARY_CLOUD_NAME || "dtha7yn1x";
	static CLOUDINARY_API_KEY: string =
		process.env.CLOUDINARY_API_KEY || "457796321727659";
	static CLOUDINARY_API_SECRET: string =
		process.env.CLOUDINARY_API_SECRET || "vZn0CbQhjz0OlgwaKQNnOHh_8ts";
}
export default Env;

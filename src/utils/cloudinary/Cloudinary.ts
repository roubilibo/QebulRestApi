import { v2 as cloudinary } from "cloudinary";
import Env from "../env/Env";

cloudinary.config({
	cloud_name: Env.CLOUDINARY_CLOUD_NAME,
	api_key: Env.CLOUDINARY_API_KEY,
	api_secret: Env.CLOUDINARY_API_SECRET,
	secure: true,
});
export const uploadToCloudinary = (
	file: Express.Multer.File
): Promise<string> => {
	return new Promise((resolve, reject) => {
		const opt = {
			folder: "Qebul-App",
		};

		cloudinary.uploader.upload(file.path, opt, function (error, result) {
			if (error) {
				return reject(error);
			}
			return resolve(result.secure_url);
		});
	});
};

export const extractPublicIdFromImageUrl = (imageUrl: string): string => {
	const parts = imageUrl.split("/");
	const fileName = parts[parts.length - 1].split(".")[0]; // Get the file name without the extension
	const folder = parts[parts.length - 2]; // Get the folder name
	const fullPublicId = `${folder}/${fileName}`; // Combine the folder and file name to make full public ID
	console.log("Extracted publicId:", fullPublicId);
	return fullPublicId;
};

export const deleteFromCloudinary = (publicId: string): Promise<any> => {
	return new Promise((resolve, reject) => {
		cloudinary.uploader.destroy(publicId, function (error, result) {
			if (error) {
				console.error("Error deleting image:", error);
				return reject(error);
			}
			console.log("Deletion result:", result);
			return resolve(result);
		});
	});
};

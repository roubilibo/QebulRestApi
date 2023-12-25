import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Product } from "../../entity/Product";
import { Brand } from "../../entity/Brand";
import { Category } from "../../entity/Category";
import { Request, Response } from "express";
import {
	addProductSchema,
	editProductSchema,
} from "../../utils/validator/validate";
import {
	deleteFromCloudinary,
	extractPublicIdFromImageUrl,
	uploadToCloudinary,
} from "../../utils/cloudinary/Cloudinary";

import { deleteFile } from "../../utils/cloudinary/Filehelper";

class ProductServices {
	private readonly productRepository: Repository<Product> =
		AppDataSource.getRepository(Product);
	private readonly brandRepository: Repository<Brand> =
		AppDataSource.getRepository(Brand);
	private readonly categoryRepository: Repository<Category> =
		AppDataSource.getRepository(Category);

	async addProduct(req: Request, res: Response): Promise<Response> {
		try {
			const {
				brand_id,
				category_id,
				product_name,
				product_description,
				product_price,
				product_quantity,
			} = req.body;
			const { error, value } = addProductSchema.validate({
				product_name,
				product_description,
				product_price,
				product_quantity,
			});
			if (error) {
				return res.status(400).json({ error: error.details[0].message });
			}
			//? Check if brand exists
			const existingBrand = await this.brandRepository.findOne({
				where: { id: brand_id },
			});
			if (!existingBrand) {
				return res.status(404).json({
					code: 404,
					message: "Brand not found",
				});
			}
			//? Check if category exists
			const existingCategory = await this.categoryRepository.findOne({
				where: { id: category_id },
			});
			if (!existingCategory) {
				return res.status(404).json({
					code: 404,
					message: "Category not found",
				});
			}

			//? upload cloudinary
			let product_image = "";
			if (req.file?.filename) {
				product_image = await uploadToCloudinary(req.file);
				deleteFile(req.file?.path);
			}

			const product = this.productRepository.create({
				brand: existingBrand,
				category: existingCategory,
				product_name: value.product_name,
				product_image: product_image,
				product_description: value.product_description,
				product_price: value.product_price,
				product_quantity: value.product_quantity,
			});

			//! Save the product to the database
			const savedProduct = await this.productRepository.save(product);

			return res.status(200).json({
				code: 200,
				status: "success",
				message: "Product added successfully",
				data: savedProduct,
			});
		} catch (error) {
			return res.status(400).json({
				code: 400,
				message: "There is an error",
				data: error,
			});
		}
	}
	async findAllProducts(req: Request, res: Response): Promise<Response> {
		try {
			//? find all products
			const product = await this.productRepository.find({
				relations: ["brand", "category"],
			});
			return res.status(200).json({
				code: 200,
				status: "success",
				data: product,
			});
		} catch (error) {
			return res.status(400).json({
				code: 400,
				message: "There is an error",
				data: error,
			});
		}
	}

	async findOneProduct(req: Request, res: Response): Promise<Response> {
		try {
			const { product_id } = req.params;

			//? find product by id
			const product = await this.productRepository.findOne({
				where: { id: parseInt(product_id) },
				relations: ["brand", "category"],
			});

			if (!product) {
				return res.status(404).json({
					code: 404,
					message: "Product not found",
				});
			}
			return res.status(200).json({
				code: 200,
				status: "success",
				data: product,
			});
		} catch (error) {
			return res.status(400).json({
				code: 400,
				message: "There is an error",
				data: error,
			});
		}
	}

	async editProduct(req: Request, res: Response): Promise<Response> {
		try {
			const {
				brand_id,
				category_id,
				product_name,
				product_description,
				product_price,
				product_quantity,
			} = req.body;

			const { error, value } = editProductSchema.validate({
				product_name,
				product_description,
				product_price,
				product_quantity,
			});

			if (error) {
				return res.status(400).json({ error: error.details[0].message });
			}

			// Check if the product exists
			const existingProduct = await this.productRepository.findOne({
				where: { id: parseInt(req.params.product_id) },
				relations: ["brand", "category"], // Include relations as needed
			});

			if (!existingProduct) {
				return res.status(404).json({
					code: 404,
					message: "Product not found",
				});
			}

			// Check if the brand exists
			const existingBrand = await this.brandRepository.findOne({
				where: { id: brand_id },
			});

			if (!existingBrand) {
				return res.status(404).json({
					code: 404,
					message: "Brand not found",
				});
			}

			// Check if the category exists
			const existingCategory = await this.categoryRepository.findOne({
				where: { id: category_id },
			});

			if (!existingCategory) {
				return res.status(404).json({
					code: 404,
					message: "Category not found",
				});
			}

			// Upload to Cloudinary and delete old image if a new one is provided
			let product_image = existingProduct.product_image;
			if (req.file?.filename) {
				// Delete old image from Cloudinary
				if (product_image) {
					// const { publicId, folder } =
					// 	extractPublicIdFromImageUrl(product_image);
					const publicId = extractPublicIdFromImageUrl(product_image);
					await deleteFromCloudinary(publicId);
					console.log("Deleting image with public ID:", publicId);
				}
				product_image = await uploadToCloudinary(req.file);
				deleteFile(req.file?.path); // Delete image if upload was successful
			}

			// Update the product properties
			existingProduct.brand = existingBrand;
			existingProduct.category = existingCategory;
			existingProduct.product_name = value.product_name;
			existingProduct.product_image = product_image;
			existingProduct.product_description = value.product_description;
			existingProduct.product_price = value.product_price;
			existingProduct.product_quantity = value.product_quantity;

			// Save the updated product to the database
			const updatedProduct = await this.productRepository.save(existingProduct);

			return res.status(200).json({
				code: 200,
				status: "success",
				message: "Product updated successfully",
				data: updatedProduct,
			});
		} catch (error) {
			return res.status(400).json({
				code: 400,
				message: "There is an error",
				data: error,
			});
		}
	}
}

export default new ProductServices();

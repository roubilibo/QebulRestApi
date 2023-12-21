import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Product } from "../../entity/Product";
import { Brand } from "../../entity/Brand";
import { Category } from "../../entity/Category";
import { Request, Response } from "express";
import { addProductSchema } from "../../utils/validator/validate";
import { uploadToCloudinary } from "../../utils/cloudinary/Cloudinary";
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
}

export default new ProductServices();

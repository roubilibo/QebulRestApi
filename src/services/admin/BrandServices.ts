import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Brand } from "../../entity/Brand";
import { Admin } from "../../entity/Admin";
import { Request, Response } from "express";
import { addBrandSchema } from "../../utils/validator/validate";

class BrandServices {
	private readonly brandRepository: Repository<Brand> =
		AppDataSource.getRepository(Brand);
	private readonly adminRepository: Repository<Admin> =
		AppDataSource.getRepository(Admin);

	async addBrand(req: Request, res: Response): Promise<Response> {
		try {
			const { brand_name } = req.body;
			const { error, value } = addBrandSchema.validate({
				brand_name,
			});
			if (error) {
				return res.status(400).json({ error: error.details[0].message });
			}

			//? Check if the brand already exists
			const existingBrand = await this.brandRepository.findOne({
				where: { brand_name: value.brand_name },
			});

			if (existingBrand) {
				return res.status(400).json({
					code: 400,
					message: "Brand already exists",
					data: existingBrand,
				});
			}

			const brand = this.brandRepository.create({
				brand_name: value.brand_name,
			});

			const savedBrand = await this.brandRepository.save(brand);
			return res.status(200).json({
				code: 200,
				status: "success",
				message: "Brand added successfully",
				data: savedBrand,
			});
		} catch (error) {
			return res.status(400).json({
				code: 400,
				message: "there is error",
				data: error,
			});
		}
	}

	async findAllBrand(req: Request, res: Response): Promise<Response> {
		try {
			// Find all brands
			const brands = await this.brandRepository.find();

			return res.status(200).json({
				code: 200,
				status: "success",
				data: brands,
			});
		} catch (error) {
			return res.status(400).json({
				code: 400,
				message: "There is an error",
				data: error,
			});
		}
	}

	async editBrand(req: Request, res: Response): Promise<Response> {
		try {
			const { brand_name } = req.body;

			// Validate inputs using the same schema or create a new one if needed
			const { error, value } = addBrandSchema.validate({
				brand_name,
			});

			if (error) {
				return res.status(400).json({ error: error.details[0].message });
			}

			// Check if the brand exists
			const existingBrand = await this.brandRepository.findOne({
				where: { id: parseInt(req.params.brand_id) },
			});

			if (!existingBrand) {
				return res.status(404).json({
					code: 404,
					message: "Brand not found",
				});
			}

			// Update the brand
			existingBrand.brand_name = value.brand_name;

			const updatedBrand = await this.brandRepository.save(existingBrand);

			return res.status(200).json({
				code: 200,
				status: "success",
				message: "Brand updated successfully",
				data: updatedBrand,
			});
		} catch (error) {
			return res.status(400).json({
				code: 400,
				message: "There is an error",
				data: error,
			});
		}
	}
	async deleteBrand(req: Request, res: Response): Promise<Response> {
		try {
			const { brand_id } = req.params;

			// Check if the brand exists
			const existingBrand = await this.brandRepository.findOne({
				where: { id: parseInt(brand_id) },
			});

			if (!existingBrand) {
				return res.status(404).json({
					code: 404,
					message: "Brand not found",
				});
			}

			// Delete the brand
			await this.brandRepository.delete(brand_id);

			return res.status(200).json({
				code: 200,
				status: "success",
				message: "Brand deleted successfully",
			});
		} catch (error) {
			return res.status(400).json({
				code: 400,
				message: "There is an error",
				data: error,
			});
		}
	}
	async findOneBrand(req: Request, res: Response): Promise<Response> {
		try {
			const { brand_id } = req.params;

			// Find the brand by ID
			const brand = await this.brandRepository.findOne({
				where: { id: parseInt(brand_id) },
			});

			if (!brand) {
				return res.status(404).json({
					code: 404,
					message: "Brand not found",
				});
			}

			return res.status(200).json({
				code: 200,
				status: "success",
				data: brand,
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
export default new BrandServices();

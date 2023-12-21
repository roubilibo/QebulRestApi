import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entity/Category";
import { Request, Response } from "express";
import { CategorySchema } from "../../utils/validator/validate";

class CategoryServices {
	private readonly categoryRepository: Repository<Category> =
		AppDataSource.getRepository(Category);

	async addCategory(req: Request, res: Response): Promise<Response> {
		try {
			const { category_name } = req.body;
			const { error, value } = CategorySchema.validate({
				category_name,
			});
			if (error) {
				return res.status(400).json({ error: error.details[0].message });
			}
			//? Check if the category already exists
			const existingCategory = await this.categoryRepository.findOne({
				where: { category_name: value.category_name },
			});
			if (existingCategory) {
				return res.status(400).json({
					code: 400,
					message: "Category already exists",
					data: existingCategory,
				});
			}
			const category = this.categoryRepository.create({
				category_name: value.category_name,
			});

			const savedCategory = await this.categoryRepository.save(category);
			return res.status(200).json({
				code: 200,
				status: "success",
				message: "Category created successfully",
				data: savedCategory,
			});
		} catch (error) {
			return res.status(400).json({
				code: 400,
				message: "There is an error",
				data: error,
			});
		}
	}
	async findAllCategory(req: Request, res: Response): Promise<Response> {
		try {
			// Find all categories
			const category = await this.categoryRepository.find();

			return res.status(200).json({
				code: 200,
				status: "success",
				data: category,
			});
		} catch (error) {
			return res.status(400).json({
				code: 400,
				message: "There is an error",
				data: error,
			});
		}
	}
	async findOneCategory(req: Request, res: Response): Promise<Response> {
		try {
			const { category_id } = req.params;

			// Find the cateory by ID
			const category = await this.categoryRepository.findOne({
				where: { id: parseInt(category_id) },
			});

			if (!category) {
				return res.status(404).json({
					code: 404,
					message: "Category not found",
				});
			}

			return res.status(200).json({
				code: 200,
				status: "success",
				data: category,
			});
		} catch (error) {
			return res.status(400).json({
				code: 400,
				message: "There is an error",
				data: error,
			});
		}
	}
	async editCategory(req: Request, res: Response): Promise<Response> {
		try {
			const { category_name } = req.body;

			// Validate inputs using the same schema or create a new one if needed
			const { error, value } = CategorySchema.validate({
				category_name,
			});

			if (error) {
				return res.status(400).json({ error: error.details[0].message });
			}

			// Check if the category exists
			const existingCategory = await this.categoryRepository.findOne({
				where: { id: parseInt(req.params.category_id) },
			});

			if (!existingCategory) {
				return res.status(404).json({
					code: 404,
					message: "Category not found",
				});
			}
			// Check if the updated category_name already exists for a different category_id
			const duplicateCategory = await this.categoryRepository.findOne({
				where: { category_name: value.category_name },
			});

			if (duplicateCategory) {
				return res.status(400).json({
					code: 400,
					message: "Category name already exists for another category_id",
				});
			}
			// Update the category
			existingCategory.category_name = value.category_name;

			const updatedCategory = await this.categoryRepository.save(
				existingCategory
			);

			return res.status(200).json({
				code: 200,
				status: "success",
				message: "Category updated successfully",
				data: updatedCategory,
			});
		} catch (error) {
			return res.status(400).json({
				code: 400,
				message: "There is an error",
				data: error,
			});
		}
	}

	async deleteCategory(req: Request, res: Response): Promise<Response> {
		try {
			const { category_id } = req.params;

			// Check if the category exists
			const existingCategory = await this.categoryRepository.findOne({
				where: { id: parseInt(category_id) },
			});

			if (!existingCategory) {
				return res.status(404).json({
					code: 404,
					message: "Category not found",
				});
			}

			// Delete the category
			await this.categoryRepository.delete(category_id);

			return res.status(200).json({
				code: 200,
				status: "success",
				message: "Category deleted successfully",
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

export default new CategoryServices();

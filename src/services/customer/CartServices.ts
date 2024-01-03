import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import Env from "../../utils/env/Env";
import { Customer } from "../../entity/Customer";
import { Product } from "../../entity/Product";
import { Cart } from "../../entity/Cart";
import { addToCartSchema } from "../../utils/validator/validate";
import { Category } from "../../entity/Category";

class CartServices {
	private readonly customerRepository: Repository<Customer> =
		AppDataSource.getRepository(Customer);
	private readonly ProductRepository: Repository<Product> =
		AppDataSource.getRepository(Product);
	private readonly CartRepository: Repository<Cart> =
		AppDataSource.getRepository(Cart);

	async addToCart(req: Request, res: Response): Promise<Response> {
		try {
			const { product_id, quantity } = req.body;
			const { error, value } = addToCartSchema.validate({
				product_id,
				quantity,
			});
			if (error) {
				return res.status(400).json({ error: error.details[0].message });
			}

			//todo Check if product exists
			const existingProduct = await this.ProductRepository.findOne({
				where: { id: parseInt(value.product_id) },
			});
			if (!existingProduct) {
				return res.status(404).json({
					code: 404,
					message: "Product not found",
				});
			}
			//todo Check if the product is already in the cart
			const existingCartEntry = await this.CartRepository.findOne({
				where: {
					customer: res.locals.loginSession.id,
					product: value.product_id,
				},
			});

			if (existingCartEntry) {
				//todo If the product is in the cart, update the quantity
				existingCartEntry.quantity += value.quantity;
				const updatedCartEntry = await this.CartRepository.save(
					existingCartEntry
				);

				return res.status(200).json({
					code: 200,
					status: "success",
					message: "Quantity updated in the cart successfully",
					data: updatedCartEntry,
				});
			} else {
				//todo If the product is not in the cart, create a new entry
				const cart = this.CartRepository.create({
					customer: res.locals.loginSession.id,
					product: existingProduct,
					quantity: value.quantity,
				});

				const savedCart = await this.CartRepository.save(cart);

				return res.status(200).json({
					code: 200,
					status: "success",
					message: "Product added to cart successfully",
					data: savedCart,
				});
			}
		} catch (error) {
			return res.status(400).json({
				code: 400,
				message: "There is an error",
				data: error,
			});
		}
	}

	async showCart(req: Request, res: Response): Promise<Response> {
		try {
			const cart = await this.CartRepository.find({
				where: { customer: res.locals.loginSession.id },
				relations: ["product", "product.brand", "product.category", "customer"],
			});
			return res.status(200).json({
				code: 200,
				status: "success",
				data: cart,
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
export default new CartServices();

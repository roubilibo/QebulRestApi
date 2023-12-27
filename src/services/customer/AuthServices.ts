import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import Env from "../../utils/env/Env";
import { Customer } from "../../entity/Customer";
import {
	loginCustomerSchema,
	registerCustomerSchema,
} from "../../utils/validator/validate";

class AuthServices {
	private readonly customerRepository: Repository<Customer> =
		AppDataSource.getRepository(Customer);

	async registerCustomer(req: Request, res: Response): Promise<Response> {
		try {
			const { username, email, password } = req.body;
			const { error, value } = registerCustomerSchema.validate({
				username,
				email,
				password,
			});
			if (error) {
				return res.status(400).json({ error: error.details[0].message });
			}

			//?check if a customer already register by email
			const existingCustomer = await this.customerRepository.count({
				where: { email: value.email },
			});

			if (existingCustomer > 0) {
				return res.status(400).json({
					code: 400,
					message: "Customer with this email already exists.",
				});
			}

			const hashedPassword = await bcrypt.hash(value.password, 10);

			const customer = this.customerRepository.create({
				username: value.username,
				email: value.email,
				password: hashedPassword,
			});

			const savedCustomer = await this.customerRepository.save(customer);
			return res.status(200).json({
				code: 200,
				message: "Customer registered successfully",
				data: savedCustomer,
			});
		} catch (error) {
			return res.status(400).json({
				code: 400,
				message: "there is error",
				data: error,
			});
		}
	}
	async loginCustomer(req: Request, res: Response): Promise<Response> {
		try {
			const { username, password } = req.body;
			const { error, value } = loginCustomerSchema.validate({
				username,
				password,
			});
			if (error) {
				return res.status(400).json({ error: error.details[0].message });
			}
			//? Check Email
			const customerSelected = await this.customerRepository.findOne({
				where: { username: value.username },
			});
			if (!customerSelected) {
				return res.status(404).json({
					code: 404,
					message: "Invalid username or username not found",
				});
			}
			//? Check Password
			const isPasswordMatch = await bcrypt.compare(
				value.password,
				customerSelected.password
			);
			if (!isPasswordMatch) {
				return res.status(400).json({
					code: 400,
					message: "Invalid password",
				});
			}

			const token = jwt.sign({ id: customerSelected.id }, Env.JWT_SECRET, {
				expiresIn: "1d",
			});
			return res.status(200).json({
				code: 200,
				message: "Customer logged in successfully",
				data: customerSelected,
				token: token,
			});
		} catch (error) {
			return res.status(400).json({
				code: 400,
				message: "there is error",
				data: error,
			});
		}
	}
}
export default new AuthServices();

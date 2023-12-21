import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Admin } from "../../entity/Admin";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import Env from "../../utils/env/Env";
import {
	createAdminSchema,
	loginAdminSchema,
} from "../../utils/validator/validate";

class AdminServices {
	private readonly adminRepository: Repository<Admin> =
		AppDataSource.getRepository(Admin);

	async createAdmin(req: Request, res: Response): Promise<Response> {
		try {
			//? Check if an admin already exists
			const existingAdminCount = await this.adminRepository.count();

			if (existingAdminCount > 0) {
				return res.status(400).json({
					code: 400,
					message: "An admin already exists. Only one admin is allowed.",
				});
			}

			const { username, email, password } = req.body;
			const { error, value } = createAdminSchema.validate({
				username,
				email,
				password,
			});
			if (error) {
				return res.status(400).json({ error: error.details[0].message });
			}
			const hashedPassword = await bcrypt.hash(value.password, 10);

			const admin = this.adminRepository.create({
				username: value.username,
				email: value.email,
				password: hashedPassword,
			});
			const savedAdmin = await this.adminRepository.save(admin);
			return res.status(200).json({
				code: 200,
				message: "Admin created successfully",
				data: savedAdmin,
			});
		} catch (error) {
			return res.status(400).json({
				code: 400,
				message: "there is error",
				data: error,
			});
		}
	}

	async loginAdmin(req: Request, res: Response): Promise<Response> {
		try {
			const { email, password } = req.body;
			const { error, value } = loginAdminSchema.validate({
				email,
				password,
			});
			if (error) {
				return res.status(400).json({ error: error.details[0].message });
			}

			//? Check Email
			const adminSelected = await this.adminRepository.findOne({
				where: {
					email: value.email,
				},
			});
			if (!adminSelected) {
				return res.status(404).json({
					code: 404,
					message: "Invalid email or email not found",
				});
			}

			//? Check Password
			const isPasswordMatch = await bcrypt.compare(
				value.password,
				adminSelected.password
			);

			if (!isPasswordMatch) {
				return res.status(401).json({
					code: 401,
					message: "Invalid password",
				});
			}

			const token = jwt.sign({ id: adminSelected.id }, Env.JWT_SECRET, {
				expiresIn: "12h",
			});
			return res.status(200).json({
				code: 200,
				status: "success",
				message: "Admin logged in successfully",
				user: adminSelected,
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

	async checkAdmin(req: Request, res: Response): Promise<Response> {
		try {
			const adminSelected = await this.adminRepository.findOne({
				where: {
					id: res.locals.loginSession.id,
				},
			});

			if (!adminSelected) {
				return res.status(404).json({
					code: 404,
					message: "Admin not found",
				});
			}

			return res.status(200).json({
				code: 200,
				status: "success",
				message: "Token is valid",
				user: adminSelected,
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
export default new AdminServices();

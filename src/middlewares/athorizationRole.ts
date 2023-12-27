import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Admin } from "../entity/Admin";
import { Customer } from "../entity/Customer";

export async function adminRole(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const adminRepository: Repository<Admin> =
			AppDataSource.getRepository(Admin);

		const adminSelected = await adminRepository.findOne({
			where: {
				id: res.locals.loginSession.id,
			},
		});
		if (!adminSelected) {
			return res.status(404).json({
				code: 404,
				message: "Access Forbidden",
			});
		}
		next();
	} catch (error) {
		return res.status(400).json({
			code: 400,
			message: "there is error",
			data: error,
		});
	}
}

export async function customerRole(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const customerRepository: Repository<Customer> =
			AppDataSource.getRepository(Customer);

		const customerSelected = await customerRepository.findOne({
			where: {
				id: res.locals.loginSession.id,
			},
		});
		if (!customerSelected) {
			return res.status(404).json({
				code: 404,
				message: "Access Forbidden",
			});
		}
		next();
	} catch (error) {
		return res.status(400).json({
			code: 400,
			message: "there is error",
			data: error,
		});
	}
}

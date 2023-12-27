import * as Joi from "joi";

export const createAdminSchema = Joi.object({
	username: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

export const loginAdminSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

export const addBrandSchema = Joi.object({
	brand_name: Joi.string().required(),
});

export const CategorySchema = Joi.object({
	category_name: Joi.string().required(),
});

export const addProductSchema = Joi.object({
	product_name: Joi.string().required(),
	product_description: Joi.string().required(),
	product_price: Joi.number().required(),
	product_quantity: Joi.number().required(),
});

export const editProductSchema = Joi.object({
	product_name: Joi.string(),
	product_description: Joi.string(),
	product_price: Joi.number(),
	product_quantity: Joi.number(),
	// Add more fields as needed, making them optional
});

export const registerCustomerSchema = Joi.object({
	username: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

export const loginCustomerSchema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
});

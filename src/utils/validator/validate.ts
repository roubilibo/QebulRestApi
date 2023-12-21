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

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
})
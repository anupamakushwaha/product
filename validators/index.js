const Joi = require('joi');

const userSchema = Joi.object({
    Username: Joi.string().required(),
    Userid: Joi.number().required()
})

const signUpSchema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required()
})

const signinSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required()
})

const productSchema = Joi.object({
    productName: Joi.string().required(),
    suplierId: Joi.number().required(),
    quantity: Joi.number().required(),
    inStock: Joi.boolean().required(),
})


module.exports = { userSchema, signUpSchema, productSchema, signinSchema };

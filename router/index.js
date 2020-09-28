const { required } = require('joi');

const router = require('express').Router()

const productRouter = require('./product.router');
const userRouter = require('./user.router');

const { verifyToken } = require('./../middleware/auth.middleware')

router.use('/product', verifyToken, productRouter);
router.use('/user', userRouter);

module.exports = router;
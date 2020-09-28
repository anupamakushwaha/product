const router = require('express').Router()
const ProductModel = require('./../model/product.modal')
const { userSchema, productSchema } = require('./../validators/index')
router.get("/", async (req, res) => {
    try {
        const { id } = req.userCtx;
        const GetProduct = await ProductModel.find({ userId: id }).populate('userId', 'userName');
        return res.send({ isSuccess: true, message: 'Success', data: GetProduct })
    } catch (error) {
        return res.status(500).send({ isSuccess: false, message: error.message })
    }
})

router.post("/", async (req, res) => {
    
    try {
        await productSchema.validateAsync(req.body)
        const { productName, suplierId, quantity, inStock } = req.body;
        const { id } = req.userCtx;
        const products = new ProductModel({ productName, suplierId, quantity, inStock, userId: id })
        const output = await products.save()

        return res.send(output)
    } catch (error) {
        return res.send({ message: error.message })

    }
})


router.get("/:id", async (req, res) => {
    const _id = req.params.id
    const { id } = req.userCtx;

    try {
        const GetProbyId = await ProductModel.findOne({ _id, userId: id })
        if (!GetProbyId) {
            return res.status(401).send()
        }
        res.send(GetProbyId)
    } catch (error) {
        return res.status(500).send(error)
    }

})

router.patch("/:id", async (req, res) => {

    try {
        const { id } = req.userCtx;
        const _id = req.params.id;
        const { productName, suplierId, quantity, inStock } = req.body
        const updateData = {}

        if (productName) updateData.productName = productName;
        if (suplierId) updateData.suplierId = suplierId;
        if (quantity) updateData.quantity = quantity;
        if (inStock) updateData.inStock = inStock;
        const GetUpdate = await ProductModel.findOneAndUpdate({ _id, userId: id }, updateData, { new: true })
        return res.send(GetUpdate)
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.userCtx;
        const _id = req.params.id;
        const GetDelete = await ProductModel.findOneAndDelete({ _id, userId: id })
        return res.send(GetDelete)
    } catch (error) {
        return res.status(500).send(error)
    }

})



module.exports = router;
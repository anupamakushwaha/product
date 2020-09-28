

const mongoose = require("mongoose")
const ProductModelSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    productName: String,
    suplierId: Number,
    quantity: Number,
    inStock: Boolean,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

});


module.exports = mongoose.model('products', ProductModelSchema);


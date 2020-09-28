const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/product_tab", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
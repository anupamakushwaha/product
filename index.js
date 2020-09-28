
const bodyParser = require("body-parser")
const app = require('express')()
require('./db/mongoose')
const port = process.env.PORT || 3000
const routes = require('./router');

// const mongoose = require("mongoose")
// mongoose.connect("mongodb://127.0.0.1:27017/product_tab", {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(routes)

app.listen(port, () => {
    console.log("server is up on port " + port)
})


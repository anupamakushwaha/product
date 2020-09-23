const Joi = require('joi')
const bodyParser = require("body-parser")
const app = require('express')()
const port =process.env.PORT||3000
const mongoose = require("mongoose")
const { request } = require('express')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect("mongodb://127.0.0.1:27017/product_tab",{
  
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify: false
    })

const ProductSchema = Joi.object({

    Productname : Joi.string().required(),                     
    Suplierid : Joi.number().required(),
    Quantity: Joi.number().required(),
    Instock:Joi.boolean().required(),
       
})

const ProductModel = mongoose.model('products',{
    Productname : String,                     
    Suplierid : Number,
    Quantity: Number,
    Instock:Boolean,
})
app.post("/",async(req,res)=>{
        try {
            
            await ProductSchema.validateAsync(req.body)
            var products=new ProductModel(req.body)
            var output = await products.save()
            return res.send(output)
        } catch (error) {
            return res.send({message:error.message})
            
        }
    
})

app.get("/",async(req,res)=>{
    try {
      const GetProduct = await ProductModel.find({})
      return res.send(GetProduct)
    } catch (error) {
        return res.status(500).send(error)
    }

})

app.get("/:id",async(req,res)=>{
    const _id=req.params.id
    try {
      const GetProbyId = await ProductModel.findById(_id)
      if (!GetProbyId)
      {
          return res.status(400).send()
      }
      res.send(GetProbyId)
    } catch (error) {
        return res.status(500).send(error)
    }

})

app.patch("/:id",async(req,res)=>{
    try {
      const GetUpdate = await ProductModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return res.send(GetUpdate)
    } catch (error) {
        return res.status(500).send(error)
    }
})

app.delete("/:id",async(req,res)=>{
    try {
      const GetDelete = await ProductModel.findByIdAndRemove(req.params.id)
      return res.send(GetDelete)
    } catch (error) {
        return res.status(500).send(error)
    }

})

app.listen(port,()=>{
    console.log("server is up on port"+ port)
})
 

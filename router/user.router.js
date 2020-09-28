
const router = require('express').Router()
//const bcrypt = require('bcrypt')
const { bcrPass, cmpPass  } = require("./../utils/bcrypt");
const { signJwt } = require('./../utils/jwt');
const { signinSchema, signUpSchema, } = require('./../validators/index')
const UserModel = require('./../model/user.model');

router.post("/signup", async (req, res) => {
    try {

        await signUpSchema.validateAsync(req.body);

        let { email, password, userName } = req.body;

        const userDoc = await UserModel.findOne({ email });

        if (userDoc) return res.status(400).send({ message: "User already exist" })

        // encrypt the password
        //password = await bcrypt.hash(password, 10)
        password = await bcrPass(password)
        const newUser = await UserModel.create({ email, password, userName });
        return res.send(newUser);
    } catch (error) {
        return res.send({ message: error.message })
    }
})

router.post("/login", async (req, res) => {

    try {

        await signinSchema.validateAsync(req.body);

        const { email, password, } = req.body;

        const userDoc = await UserModel.findOne({ email });

        if (!userDoc) return res.status(400).send({ message: "Email id not registered" });
           
         const match = await cmpPass(password, userDoc.password)
        
        //const match = await bcrypt.compare(password, userDoc.password);
        //console.log(match)
       if (!match) return res.status(400).send({ message: "Invalid password" });
        
        const token = await signJwt({ id: userDoc._id });
        res.json({ data: token });
    } catch (error) {
        return res.send({ message: error.message })
    }

})

module.exports = router;

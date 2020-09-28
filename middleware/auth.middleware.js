const { response } = require('express')
const { verifyJwt } = require('../utils/jwt')

//middleware verify
const verifyToken = async (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization']
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ')
            console.log(bearer)
            const bearerToken = bearer[1]
            const data = await verifyJwt(bearerToken);
            req.userCtx = data;
            
            next();
        } else {
            res.sendStatus(403)
        }

    } catch (error) {
        res.status(401).send({ message: 'Unauthorize' });
    }
}

module.exports = { verifyToken };
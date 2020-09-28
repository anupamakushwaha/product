const { date } = require('joi');
var jwt = require('jsonwebtoken');


const signJwt = (data) => new Promise((resolve, reject) => {
    jwt.sign(data, 'secretkey', (err, token) => {
         if (err) return reject(err)
        return resolve({ token });
    })
})

const verifyJwt = (token) => new Promise((resolve, reject) => {
    jwt.verify(token, 'secretkey', async (err, data) => {
        
        if (err || !data) {
            return reject(err)
        } else {
            resolve(data)
        }
    })
})



module.exports = { signJwt, verifyJwt }



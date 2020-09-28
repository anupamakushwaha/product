const bcrypt = require('bcrypt')

const bcrPass = (hashPass)=>{
   const password= bcrypt.hash(hashPass, 10)
   return password
}
const cmpPass = async(password, userPassword)=>{
    const isMatch = await bcrypt.compare(password, userPassword)
    return isMatch
    
}


module.exports = { bcrPass, cmpPass }
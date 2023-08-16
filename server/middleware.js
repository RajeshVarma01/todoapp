const jwt = require("jsonwebtoken")
module.exports = async (req, res, next) => {
     let token = await req.headers['x-token']
    try{
        if(!token){
            return res.status(400).send("Token not found")
        }
        let decode = jwt.verify(token, "jwtSecret")
        req.user = decode.user
        next()
    }catch(e){
        return res.status(500).send(e.message)
    }
}
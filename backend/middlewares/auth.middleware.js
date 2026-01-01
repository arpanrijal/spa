import jwt from "jsonwebtoken"
const authUserMiddleware = (req,res,next)=>{
    const token = req.cookies?.token_spa
    if(!token){
        return res.status(401).json({success: false, message: "No token"})
    }
    try {
        const decoded = jwt.verify(token, process.env.jwtSecretToken)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid token" })
    }
}

export {authUserMiddleware}


    // const token = req.cookies?.token_spa || req.headers.authorization?.split(" ")[1]

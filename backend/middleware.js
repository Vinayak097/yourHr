import jwt from 'jsonwebtoken'

const middleware=(req,res,next)=>{
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).json({message:"token not provided"});
    }
    try{
        
        console.log(process.env.JWT_SCRET);
        const decode=jwt.verify(authHeader,process.env.JWT_SCRET)
        if(!decode){
            res.status(400).json({message:"invalid token"});
        }
        console.log(decode)
        req.email=decode.email;        
        next();

    }catch(e){
        console.log("error in middlware ",e.message);
        res.status(500).json("Internal server error ");
    }
}

export default  middleware;
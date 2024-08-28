import jwt from 'jsonwebtoken'

const   middleware=(req,res,next)=>{
    const authHeader = req.headers.authorization;
    if (!authHeader){
        return res.status(403).json({message:"token not provided"});
    }
    try{
        const secret=process.env.JWT_SECRET;
        if(!secret){
            return res.status(404).json({message:"token not secret"})
        }
        
        const decode=jwt.verify(authHeader,secret)
        if(!decode){
            return res.status(400).json({message:"invalid token"});
        }
        console.log(decode)
        req.id=decode.id;        
        next();

    }catch(e){
        console.log("error in middlware ",e.message);
        return res.status(500).json("Internal server error ");
    }
}

export default  middleware;
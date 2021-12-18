const jwt=require("jsonwebtoken")
const db = require("../db.js")

const auth=async(req,res,next)=>{

    try{
        const idToken=req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(idToken,'jujutsu-sorcerer')
        req.email=decoded.email
        sql="SELECT * from student where email= ?"
        db.query(sql,decoded.email,(err,result)=>{
            if(err)  return res.status(400).send({msg:err})
            
        return next();
        })
        
    }catch(e){
          res.status(401).send({error: "please authenticate."})
    }
}

module.exports=auth
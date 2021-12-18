const express=require('express')
const router=express.Router()
const sql=require('../db.js')
const bcrypt=require('bcrypt')
const mysql=require('mysql2')
const jwt = require("jsonwebtoken")
const validRegInP=require('../validation/register')
const validlogInP=require('../validation/login')
const auth1 = require('../middleware/auth1')


router.post('/register',async (req,res)=>{
    const { errors, isValid } = validRegInP(req.body);
    if (!isValid) {
        return res.status(400).send(errors);
      }
    
    const name=req.body.name
    const email=req.body.email
    const hashedpassword= await bcrypt.hash(req.body.password,10)
    let  role=req.body.role

    const string1="Student"

     if(role===string1){
        console.log(1)
        const sqlSearch = "SELECT * FROM student WHERE email= ?"
        const search_query = mysql.format(sqlSearch,[email])
        const  sqlInsert = "INSERT INTO student (stu_name,email,password) VALUES (?,?,?)"
        const insert_query = mysql.format(sqlInsert,[name,email,hashedpassword])
        const user={name,email,hashedpassword}
     sql.query(search_query,(err,result)=>{
      
    if(err)    return res.status(400).send({msg:err})
          console.log("------> Search Results")
        
          if (result.length!==0) return res.status(409).send({msg: 'User Already Exists'});
          
          else {
          sql.query (insert_query, (err, result)=> {
            if(err)  return res.status(400).send({msg:err})
  
           console.log ("--------> Created new User")
           console.log(result.insertId)
           return res.status(201).send({userdata:user,msg:"successfully registered"})
          })
         }
       })
    }
    else {
    console.log(2)
     const  subject=req.body.subject
     const sqlSearch = "SELECT * FROM teacher WHERE email= ?"
     const search_query = mysql.format(sqlSearch,[email])
     const sqlInsert = "INSERT INTO teacher (name,email,password,subject) VALUES (?,?,?,?)"
     const insert_query = mysql.format(sqlInsert,[name,email,hashedpassword,subject])
     const user={name,email,hashedpassword,subject}
     sql.query(search_query,(err,result)=>{
        if(err)    return res.status(400).send({msg:err})
          console.log("------> Search Results")
        
          if (result.length!==0) return res.status(409).send({msg: 'User Already Exists'});
          
          else {
          sql.query (insert_query, (err, result)=> {
            if(err)  return res.status(400).send({msg:err})
  
           console.log ("--------> Created new User")
           console.log(result.insertId)
           return res.status(201).send({userdata:user,msg:"successfully registered"})
          })
         }
       })
    }
  
     
})




router.post('/login',(req,res)=>{
    let {email,password,role}=req.body
  
    const {errors,isValid}=validlogInP(req.body)
    if(!isValid)    return res.status(400).json(errors)
      
    const string1="Student"
    if(role===string1){
        console.log(1)
     sql.query('SELECT * from student WHERE email=?',email,(err,result)=>{
      if(err)    return res.status(400).send({msg:err})
     
      if(result.length===0)   return res.status(401).send({msg:'email or password is incorrect'})
      
      bcrypt.compare(password,result[0].password).then(isMatch=>{
                 if(isMatch===false)   return res.status(401).send({msg:"email or Password is incorrect "})
     })
  
     const token = jwt.sign({email:result[0].email},'the-super-strong-secrect',{ expiresIn: '1h' });
     return res.status(200).send({msg: 'Log in!',token,user: result[0]});
  })
    }
    else {
      sql.query('SELECT * from teacher WHERE email=?',email,(err,result)=>{
        if(err)    return res.status(400).send({msg:err})
       
        if(result.length===0)   return res.status(401).send({msg:'email or password is incorrect'})
        
        bcrypt.compare(password,result[0].password).then(isMatch=>{
                   if(isMatch===false)   return res.status(401).send({msg:"email or Password is incorrect "})
       })
    
       const token = jwt.sign({email:result[0].email},'jujutsu-sorcerer',{ expiresIn: '1h' });
       return res.status(200).send({msg: 'Log in!',token,user: result[0]});
    })
    }
  })
  




module.exports=router
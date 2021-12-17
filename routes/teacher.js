const express=require('express')
const router=express.Router()
const sql=require('../db.js')
const bcrypt=require('bcrypt')
const mysql=require('mysql2')
const jwt = require("jsonwebtoken")
const validRegInP=require('../validation/register')
const validlogInP=require('../validation/login')
const auth2=require('../middleware/auth2')


//Student Registration
// router.post('/register',async (req,res)=>{
//      console.log(req.body)   

//     const { errors, isValid } = validRegInP(req.body);
//     if (!isValid)   return res.status(400).send(errors);
      

//     const name=req.body.name
//     const teacher_id=req.body.teacher_id
//     const subject=req.body.subject
//     const email=req.body.email
//     const mobile=req.body.mobile
//     const designation=req.body.designation
//     const hashedpassword= await bcrypt.hash(req.body.password,10)

//    const user={teacher_id,name,subject,email,hashedpassword,mobile,designation}

//     const sqlSearch = "SELECT * FROM teacher WHERE teacher_id= ?"
//     const search_query = mysql.format(sqlSearch,[teacher_id])
//     const sqlInsert = "INSERT INTO teacher (teacher_id,name,subject,email,password,mobile,designation) VALUES (?,?,?,?,?,?,?)"
//     const insert_query = mysql.format(sqlInsert,[teacher_id,name,subject,email,hashedpassword,mobile,designation])

//      sql.query(search_query,(err,result)=>{
//       if(err)    return res.status(400).send({msg:err})
//       console.log("------> Search Results")

//        if (result.length!==0) return res.status(409).send({msg: 'User Already Exists'});
//         else {
//         sql.query (insert_query, (err, result)=> {
//           if(err)  return res.status(400).send({msg:err})

//          console.log ("--------> Created new User")
//          console.log(result.insertId)
//          return res.status(201).send({userdata:user,msg:"successfully registered"})
//         })
//        }
//      })
// })



//Teacher Login
router.post('/login',(req,res)=>{
  const {email,password}=req.body

  const {errors,isValid}=validlogInP(req.body)
  if(!isValid)    return res.status(400).json(errors)
  
   sql.query('SELECT * from teacher WHERE email=?',email,(err,result)=>{
    if(err)    return res.status(400).send({msg:err})
   
    if(result.length===0)   return res.status(401).send({msg:'email or password is incorrect'})
    
    bcrypt.compare(password,result[0].password).then(isMatch=>{
               if(isMatch===false)   return res.status(401).send({msg:"email or Password is incorrect "})
   })

   const token = jwt.sign({email:result[0].email},'jujutsu-sorcerer',{ expiresIn: '1h' });
   return res.status(200).send({msg: 'Log in!',token,user: result[0]});
})
})

//get profile
router.get('/profile/:id',auth2, async (req,res)=>{
    
    const sqlSearch = "SELECT * FROM teacher WHERE teacher_id= ?"
    const search_query = mysql.format(sqlSearch,[req.params.id])
    sql.query(search_query,(err,result)=>{
        if (err) {
            console.log("error: ", err);
            return  res.status(400).send({msg:err})
          }
          if (result.length)   return  res.status(400).send({user:result[0]})
          
          return  res.status(400).send({msg:'Not Found'})
    })

})



module.exports=router
const express=require('express')
const router=express.Router()
const sql=require('../db.js')
const bcrypt=require('bcrypt')
const mysql=require('mysql2')
const jwt = require("jsonwebtoken")
const validRegInP=require('../validation/register')
const validlogInP=require('../validation/login')



//Student Registration
router.post('/register',async (req,res)=>{

    const { errors, isValid } = validRegInP(req.body);
    if (!isValid) {
        return res.status(400).send(errors);
      }

    x
    const teacher_id=req.body.teacher_id
    const subject=req.body.subject
    const email=req.body.email
    const mobile=req.body.mobile
    const designation=req.body.designation
    const hashedpassword= await bcrypt.hash(req.body.password,10)

    const sqlSearch = "SELECT * FROM teacher WHERE teacher_id= ?"
    const search_query = mysql.format(sqlSearch,[teacher_id])
    const sqlInsert = "INSERT INTO teacher (teacher_id,name,subject,email,password,mobile,designation) VALUES (?,?,?,?,?,?,?)"
    const insert_query = mysql.format(sqlInsert,[teacher_id,name,subject,email,hashedpassword,mobile,designation])

     sql.query(search_query,(err,result)=>{
        if (err) throw (err)
        console.log("------> Search Results")
        console.log(result.length)
        if (result.length != 0) {
         console.log("------> User already exists")
         res.sendStatus(409) 
        } 
        else {
        sql.query (insert_query, (err, result)=> {
         if (err) throw (err)
         console.log ("--------> Created new User")
         console.log(result.insertId)
         res.sendStatus(201)
        })
       }
     })
})



//Student Login
router.post('/login', (req, res) => {
    const {errors,isValid}=validlogInP(req.body)
    if(!isValid){
        return res.status(400).json(errors)
    }
    sql.query(
    `SELECT * FROM teacher WHERE email = ${sql.escape(req.body.email)};`,
    (err, result) => {
    // user does not exists
    if (err) throw err;

    if (!result.length) return res.status(401).send({ msg: 'Email or password is incorrect!'});
    
    // check password
    bcrypt.compare(req.body.password,result[0]['password'],
    (bErr, bResult) => {
    // wrong password
    if (bErr) throw bErr;
    
    if (bResult) {
    const token = jwt.sign({email:result[0].email},'the-super-strong-secrect',{ expiresIn: '1h' });
   // sql.query( `UPDATE  SET last_login = now() WHERE email = '${result[0].email}'`);
    return res.status(200).send({msg: 'Logged in!',token,user: result[0]});
    }
    return res.status(401).send({msg: 'Username or password is incorrect!'});
    });
    });
    });

//get profile
router.get('/profile/:id',async (req,res)=>{
    
    const sqlSearch = "SELECT * FROM teacher WHERE teacher_id= ?"
    const search_query = mysql.format(sqlSearch,[req.params.id])
    sql.query(search_query,(err,result)=>{
        if (err) {
            console.log("error: ", err);
            return  res.status(400).send({msg:err})
          }
          if (result.length) {
            return  res.status(400).send({user:result[0]})
          }
          // not found Tutorial with the id
          return  res.status(400).send({msg:'Not Found'})
    })

})



module.exports=router
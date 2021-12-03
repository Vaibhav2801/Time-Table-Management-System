const express=require('express')
const router=express.Router()
const sql=require('../db.js')
const bcrypt=require('bcrypt')
const mysql=require('mysql2')
const jwt = require("jsonwebtoken")



//Student Registration
router.post('/register',async (req,res)=>{
    const roll_no= req.body.roll_no
    const name=req.body.name
    const email=req.body.email
    const mobile=req.body.mobile
    const address=req.body.address
    const hashedpassword= await bcrypt.hash(req.body.password,10)
    const branch= req.body.branch

    const sqlSearch = "SELECT * FROM student WHERE roll_no= ?"
    const search_query = mysql.format(sqlSearch,[roll_no])


    const sqlInsert = "INSERT INTO student (stu_id,roll_no,stu_name,email,mobile,address,password,branch) VALUES (0,?,?,?,?,?,?,?)"
    const insert_query = mysql.format(sqlInsert,[roll_no,name,email,mobile,address,hashedpassword,branch])

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
    sql.query(
    `SELECT * FROM student WHERE email = ${sql.escape(req.body.email)};`,
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
    
    const sqlSearch = "SELECT * FROM student WHERE stu_id= ?"
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
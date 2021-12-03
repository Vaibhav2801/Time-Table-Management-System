const express=require('express')
const dbConfig = require('../config/db.config.js')
const router=express.Router()
const sql=require('../db.js')
const bcrypt=require('bcrypt')
const mysql=require('mysql2')

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




    // sql.query(
    //     "INSERT INTO student (roll_no,stu_name,email,mobile,address,password) VALUES (?,?,?,?,?,?)",
    //     [roll_no,name,email,mobile,address,password],(err,result)=>{
    //         if(err){
    //             console.log(err)
    //         }else {
    //             res.send("Values Inserted")
    //         }
    //     }
    // )


})





module.exports=router
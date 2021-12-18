const express = require("express");
const router = express.Router();
const sql = require("../db.js");
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const validRegInP = require("../validation/register");
const validlogInP = require("../validation/login");
const auth1 = require("../middleware/auth1");

//Student Registration
// router.post('/register',async (req,res)=>{
//     const { errors, isValid } = validRegInP(req.body);
//     if (!isValid) {
//         return res.status(400).send(errors);
//       }
    
//     const name=req.body.name
//     const email=req.body.email
//     const hashedpassword= await bcrypt.hash(req.body.password,10)
//     const role=req.body.role
//     const subject=0

//     const sqlSearch = "SELECT * FROM student WHERE email= ?"
//     const search_query = mysql.format(sqlSearch,[email])

//     const sqlInsert=0,insert_query=0
//     if(role==='Student'){
//      sqlInsert = "INSERT INTO student (stu_name,email,password) VALUES (?,?,?)"
//      insert_query = mysql.format(sqlInsert,[name,email,hashedpassword])
//     }
//     else {
//       subject=req.body.user
//      sqlInsert = "INSERT INTO student (name,email,password,subject) VALUES (?,?,?,?)"
//      insert_query = mysql.format(sqlInsert,[name,email,hashedpassword,subject])
//     }
  
//      sql.query(search_query,(err,result)=>{
//       if(err)    return res.status(400).send({msg:err})
//         console.log("------> Search Results")
      
//         if (result.length!==0) return res.status(409).send({msg: 'User Already Exists'});
        
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



// Student Login
// router.post('/login',(req,res)=>{
//   const {email,password,role}=req.body

//   const {errors,isValid}=validlogInP(req.body)
//   if(!isValid)    return res.status(400).json(errors)
    
//   const string1="Student"
//   if(role===string1){
//    sql.query('SELECT * from student WHERE email=?',email,(err,result)=>{
//     if(err)    return res.status(400).send({msg:err})

//     if(result.length===0)   return res.status(401).send({msg:'email or password is incorrect'})

//     bcrypt.compare(password,result[0].password).then(isMatch=>{
//                if(isMatch===false)   return res.status(401).send({msg:"email or Password is incorrect "})
//    })

//    const token = jwt.sign({email:result[0].email},'the-super-strong-secrect',{ expiresIn: '1h' });
//    return res.status(200).send({msg: 'Log in!',token,user: result[0]});
// })
//   }
//   else {
//     sql.query('SELECT * from teacher WHERE email=?',email,(err,result)=>{
//       if(err)    return res.status(400).send({msg:err})
     
//       if(result.length===0)   return res.status(401).send({msg:'email or password is incorrect'})
      
//       bcrypt.compare(password,result[0].password).then(isMatch=>{
//                  if(isMatch===false)   return res.status(401).send({msg:"email or Password is incorrect "})
//      })
  
//      const token = jwt.sign({email:result[0].email},'jujutsu-sorcerer',{ expiresIn: '1h' });
//      return res.status(200).send({msg: 'Log in!',token,user: result[0]});
//   })
//   }
// })

 //Visit profile
router.get('/profile/:id',auth1,async (req,res,next)=>{
    
    const sqlSearch = "SELECT * FROM student WHERE email= ?"
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

// bcrypt.compare(password, result[0].password).then((isMatch) => {
//   if (isMatch === false)
//     return res.status(401).send({ msg: "email or Password is incorrect " });
// });

// const token = jwt.sign({ email: result[0].email }, "the-super-strong-secrect", {
//   expiresIn: "1h",
// });
// return res.status(200).send({ msg: "Log in!", token, user: result[0] });

// //get profile
// router.get("/profile/:id", auth1, async (req, res, next) => {
//   const sqlSearch = "SELECT * FROM student WHERE roll_no= ?";
//   const search_query = mysql.format(sqlSearch, [req.params.id]);
//   sql.query(search_query, (err, result) => {
//     if (err) {
//       console.log("error: ", err);
//       return res.status(400).send({ msg: err });
//     }

//     if (result.length) return res.status(400).send({ user: result[0] });

//     return res.status(400).send({ msg: "Not Found" });
//   });
// });

module.exports = router;

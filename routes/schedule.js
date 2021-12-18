const express=require('express')
const router=express.Router()
const sql=require('../db.js')
const mysql=require('mysql2')
const auth2=require('../middleware/auth2')

router.post('/create',(req,res)=>{
  console.log(1)
     const sub=req.body.sub
     const teacher_name=req.body.teacher_name
     const date=req.body.date
     const start_time=req.body.start_time
     const end_time=req.body.end_time

     const sqlSearch = "SELECT * FROM schedule WHERE (start_time<= ? and end_time>? ) or (start_time< ? and end_time>=?)"
     const search_query = mysql.format(sqlSearch,[start_time,start_time,end_time,end_time])
     const sqlInsert = "INSERT INTO schedule (sub,teacher_name,start_time,end_time,date) VALUES (?,?,?,?,?)"
     const insert_query = mysql.format(sqlInsert,[sub,teacher_name,start_time,end_time,date])
 
      sql.query(search_query,(err,result)=>{
         if (err) throw (err)
         console.log("------> Search Results")
         console.log(result.length)
         if (result.length != 0) {
          console.log("Lecture is already scheduled at that time")
          res.status(404).send({msg:'Lecture is already scheduled at that time'}) 
         } 
         else {
         sql.query (insert_query, (err, result)=> {
          if (err) throw (err)
          console.log ("--------> Lecture Scheduled")
          console.log(result.num)
          res.sendStatus(201)

         })
        }
      })
})

 //Get Schedule of given branch
// router.get('/:branch',(req,res)=>{
//     const sqlSearch = "SELECT * FROM schedule WHERE branch= ?"
//     const search_query = mysql.format(sqlSearch,[req.params.branch])
//     sql.query(search_query,(err,result)=>{
//         if (err) {
//             console.log("error: ", err);
//             return  res.status(400).send({msg:err})
//           }
//           if (result.length) {
//             return  res.status(400).send({lectures:result})
//           }
          
//           return  res.status(400).send({msg:'No Lecture is Scheduled'})
// })
// })

//Get Schedules
router.get('/getclasses',(req,res)=>{
    const sqlSearch = "SELECT * FROM schedule"
    const search_query = mysql.format(sqlSearch)
    sql.query(search_query,(err,result)=>{
        if (err) {
            console.log("error: ", err);
            return  res.status(400).send({msg:err})
          }
          if (result.length) {
             console.log(result)
            return  res.status(200).send(result)
          }
         
          return  res.status(200).send({msg:'No Lecture is found'})
})
})


//Delete a scheduled lecture
router.delete('/delete/:num',(req,res)=>{
  const sqlSearch = "DELETE FROM schedule WHERE num= ?"
  const search_query = mysql.format(sqlSearch,[req.params.num])
  sql.query(search_query,(err,result)=>{
    if (err) {
      if (err.kind === "not_found")   res.status(404).send({message: `Not found Lecture with id ${req.params.num}.`});

      else   res.status(500).send({message: "Could not delete Lecture with id " + req.params.num});
    } 
    else res.send({ message: `Lecture was deleted successfully!` });
})
})

//update a lecture
router.put('/update/:num',(req,res)=>{
  const sub=req.body.sub
  const teacher_name=req.body.teacher_name
  const date=req.body.date
  const start_time=req.body.start_time
  const end_time=req.body.end_time
  const sched=req.body
 sql.query("UPDATE schedule SET sub=?,teacher_name=?,start_time=?,end_time=?,date=? WHERE num=?",
 [sub,teacher_name,start_time,end_time,date,req.params.num],
 (err,result)=>{
  if (err) {
    console.log("error: ", err);
   return    res.status(400).send({msg:err})
  }
  if (res.affectedRows == 0)   return   res.status(200).send({msg:'No Lecture is found'})
    
  sql.query('SELECT * FROM schedule WHERE num=?',req.params.num,(err,result)=>{
    if (err) {
      console.log("error: ", err);
     return    res.status(400).send({msg:err})
    }
    if (result.length == 0)   return   res.status(200).send({msg:'No Lecture is found'})

     return   res.send({sched:result})
  })
 }
 )
  
})



module.exports=router
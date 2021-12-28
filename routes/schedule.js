const express=require('express')
const router=express.Router()
const sql=require('../db.js')
const mysql=require('mysql2')

//Create a Schedule
router.post('/create',(req,res)=>{
     if(!req.body.logindata){
       return res.status(401).send({msg:"Unauthorised"})
     }
     else{
     const sub=req.body.data.sub
     const teacher_name=req.body.data.teacher_name
     const date=req.body.data.date
     const start_time=req.body.data.start_time
     const end_time=req.body.data.end_time

      sql.query("SELECT * FROM schedule WHERE (start_time<= ? and end_time>? ) or (start_time< ? and end_time>=?)",
      [start_time,start_time,end_time,end_time],
      (err,result)=>{
         if (err) throw (err)
         if (result.length != 0) {
          console.log("Lecture is already scheduled at that time")
          res.status(404).send({msg:'Lecture is already scheduled at that time'}) 
         } 
         else {
           sql.query("SELECT * FROM TEACHER WHERE name=?",[teacher_name],(err,result)=>{
            if (err) throw (err)
            if (result.length == 0) {
             console.log("You can't schedule a lecture")
             res.status(404).send({msg:"You can't Schedule a lecture"}) 
            } 
            else {
              sql.query ("INSERT INTO schedule (sub,teacher_name,start_time,end_time,date) VALUES (?,?,?,?,?)",
              [sub,teacher_name,start_time,end_time,date], 
              (err, result)=> {
               if (err) throw (err)
               console.log ("Lecture Scheduled")
               res.sendStatus(201)
              })
            }
           })
        
        }
      })
}})

//Get Schedules
router.get('/getclasses',(req,res)=>{
    sql.query("SELECT * FROM schedule order by date asc , start_time asc",(err,result)=>{
        if (err) {
            console.log("error: ", err);
            return  res.status(400).send({msg:err})
          }
          if (result.length) {
             console.log(result)
            return  res.status(200).send(result)
          }
         
          return  res.status(200).send()
})
})


//Delete a scheduled lecture
router.delete('/delete/:num',(req,res)=>{
  sql.query("DELETE FROM schedule WHERE num= ?",[req.params.num],(err,result)=>{
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
 sql.query("UPDATE schedule SET sub=?,teacher_name=?,start_time=?,end_time=?,date=? WHERE num=?",
 [sub,teacher_name,start_time,end_time,date,req.params.num],
 (err,result)=>{
  if (err) {
    console.log("error: ", err);
   return    res.status(400).send({msg:err})
  }
  if (res.affectedRows == 0)   return   res.status(200).send({msg:'No Lecture is found'})
  return   res.send({sched:result})
 }
 )
  
})



module.exports=router
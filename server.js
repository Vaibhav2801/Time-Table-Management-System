const express=require('express')
const bodyParser=require('body-parser')
const student=require('./routes/student')
const db =require('./db.js')
const passport=require('passport')



const app=express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json()) 


//sql connection
db.connection



app.use('/student',student)
app.get('/',(req,res)=>{
    res.json({message:"Welcome"})
})


const port=process.env.PORT || 3000
app.listen(port,()=> console.log('Server is up on port '+port))
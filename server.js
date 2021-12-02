var mysql=require('mysql2')
const express=require('express')
const bodyParser=require('body-parser')


const app=express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json()) 

//Connect mysql
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Vaibhav@123',
    database: 'timetable'
});
  
connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
  });


app.get('/',(req,res)=>{
    res.json({message:"Welcome"})
})


const port=process.env.PORT || 3000
app.listen(port,()=> console.log('Server is up on port '+port))
const express = require("express");
const bodyParser = require("body-parser");

const schedule = require("./routes/schedule");
const db = require("./db.js");
const {OAuth2Client}=require('google-auth-library')
const dotenv=require('dotenv')

dotenv.config()
const client=new OAuth2Client(process.env.clientId)

const user=[]



const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//sql connection
db.connection;


app.use("/", schedule);

app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

function upsert(array,item){
  const i=array.findIndex((_item)=> _item.email===item.email)
  if(i>-1) array[i]=item
  else array.push(item)
}


app.post('/api/google-login',async (req,res)=>{
  console.log(req.body)
  const {token}=req.body
  const ticket = await client.verifyIdToken({
    idToken:token,
    audience:process.env.clientId
  })
const {name,email,picture}=ticket.getPayload()
upsert(user,{name,email,picture})
res.status(201)
res.json({name,email,picture})
})



const port = process.env.PORT || 4000;
app.listen(port, () => console.log("Server is up on port " + port));




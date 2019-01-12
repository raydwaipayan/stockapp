const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const api=require("./routes/api");
const app=express();

const populateDB=require("./config/populate");

app.use(
  bodyParser.urlencoded({
    extended:false
  })
);
app.use(bodyParser.json());

const db=require("./config/keys").mongoURI;

mongoose.connect(
  db,{useNewUrlParser:true}
)
.then(()=> {
  console.log("MongoDB successfully connected")
})
.catch(err=>console.log(err));

app.use("/",api);

const port=process.env.PORT || 5000;

app.listen(port,()=>console.log(`Server up and running on port ${port}!`));

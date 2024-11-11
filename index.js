const express=require("express");
const dotenv=require("dotenv");

const {users} = require("./data/users.json");
//import  routes
const userRouter= require("./routes/users.js");
const booksRouter=require("./routes/books.js");
// database  connection

//const  DbcConnection=require("./databaseConnection");
const DbConnection=require("./routes/databaseConnection")
dotenv.config();

const app=express();

DbConnection();

const PORT =8081;

app.use(express.json());

http: app.get("/", (req,res) =>{
    res.status(200).json({
        message : "Server is  up and  running :-)",
       // data : "hey " , 
     //res.status(200).send("server  is  up", "hey")   cannot  send   without  json 
  });
});


app.use("/users", userRouter);
app.use("/books", booksRouter);

app.get("*", (req,res)=>{
    res.status (404).json({
        message: "This route doesn't exist"
    });

});
app.listen(PORT, ()=>{
    console.log('Server is running  at  port  ${PORT}');
})

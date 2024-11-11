const BOOKSROUTER =  require("./routes/books"); 

const express =require("express");
const {users} = require("./data/users.json");
const  app = express();

const  PORT = 8081;



app.use(express.json());

app.get("/", (req,res) =>{
    res.status(200).json({
        message : "Server is  up and  running :-)",
        data : "hey " , 
     //res.status(200).send("server  is  up", "hey")   cannot  send   without  json 
  });
});

app.use("users", userRouter);
app.use("books", booksRouter);

app.get("/users", (req,res) =>{

    res.status(200).json({
        success : true, 
          data : users,
        //  data : books,
           
  });
  });

app.get("/users/:id", (req,res) =>{
   const {id} =req.params;
   const user =users.find((each)=> each.id ===id); 
   if  (!user) {
       return res.status(404).json({
       success: false,
           message : "User Doesn't  Exist !!!",

        });
       } 
    return res.status(200).json({
       success : true,
       message : "user found",
        data : user
     });
});
app.post("/users", (req,res) =>{
    const {id,name, surname,email, subscriptionType, subscriptionDate} = req.body;
    const user =users.find((each)=> each.id ===id); 
    if  (user) {
        return res.status(404).json({
            success: false,
            message : "User with this  id Exists !!!",

        });
    } 
    users.push({
        id,name,surname, email,subscriptionType,subscriptionDate }
     );
    return res.status(201).json({
        success : true,
        message : "user added  successfully",
         data : user
});
});

app.put("/users/:id", (req,res) =>{
    const {id } = req.params;
    const {data} = req.body;   
    
    const user =users.find((each)=> each.id ===id); 
    if  (!user) {
        return res.status(404).json({
            success: false,
            message : "User Doesn't Exist !!!",

        });
    } 
    const updateUserData=users.map((each)=> {
        if (each.id===id){
            return{
                ... each,
                ... data,
            };
        } 
        return each;
    });
    return res.status(200).json({
        success : true,
        message : "user updated !!",
         data : updateUserData,
});
});

app.delete("/users/:id", (req,res) =>{
    const {id } = req.params;
       
    
    const user =users.find((each)=> each.id ===id); 
    if  (!user) {
        return res.status(404).json({
            success: false,
            message : "User Doesn't Exist !!!",

        });
    } 
    const index=users.indexOf(user) ;
        users.splice(index,1)
    return res.status(200).json({
            success : true,
            message : "Deleted User..",
             data : users
    })
    
    })
    

app.get("*", (req,res)=>{
    res.status (404).json({
        message: "This route doesn't exist"
    });

});
app.listen(PORT, ()=>{
    console.log('Server is running  at  port  ${PORT}')
})
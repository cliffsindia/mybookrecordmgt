const express =require("express");
const dotenv =require("dotenv");


//const booksRouter =  require("./routes/books"); 
//const userRouter = require("./routes/users.js");
//const DbcConnection=require("./databaseConnection")
//dotenv.config(); 


const {users} = require("../data/users.json");
//const router = require("./books.js");
const router = express.Router();
//const  app = express();
//DbcConnection();

//const  PORT = 8081;

//app.use(express.json());



router.get("/users", (req,res) =>{
    res.status(200).json({
        //message : "Server is  up and  running :-)",
        succces : true,
        data : users, 
     //res.status(200).send("server  is  up", "hey")   cannot  send   without  json 
  });
});

//app.use("users", userRouter);//
//app.use("books", booksRouter);
//localhost:8081/users
router.get("/", (req,res) =>{

    res.status(200).json({
       success : true, 
       data : users,
              
    });
  });

router.get("/:id", (req,res) =>{
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
        data : user,
     });
});
router.post("/", (req,res) =>{
    const {id,name, surname,email, subscriptionType, subscriptionDate} = req.body;
    const user =users.find((each)=> each.id ===id); 
    if  (user) {
        return res.status(404).json({
            success: false,
            message : "User with this  id  already Exists !!!",

        });
    } 
    users.push({
        id,name,surname, email,subscriptionType,subscriptionDate }
     );
    return res.status(201).json({
        success : true,
        message : "user added  successfully",
        data : users,
});
});

router.put("/:id", (req,res) =>{
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
         data : updateUser,
});
});

router.delete("/:id", (req,res) =>{
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
    

//app.get("*", (req,res)=>{
 //   res.status (404).json({
   //     message: "This route doesn't exist"
   // });

//});

router.get("/subscription-details/:id", (req, res)=> {
    const {id} = req.params;
    const user=users.find((each)=> each.id===id);
    
    if(!user){
        return res.status(404).json({
            succces : false,
            message : "User  with  the  ID  Doesnt exist"
        });
    }
    const  getDateInDays = (data="") => {
        let  date;
        if (data === "") {
            date = new Date();
           }  else {
            date=new Date(data);
           }
           let  days=Math.floor(date / (1000* 60* 60* 24));
           return  days;     
    };
    const subscriptionType = (date) => {
        if ((user.subscriptionType =="Basic")) {
            date=date + 90;
        } else  if ((user.subscriptionType=="Standard")) {
            date=date + 180;
         } else  if ((user.subscriptionType== "Premium")) {
            date =date + 365;
         }
        return date;  
      };

       let returnDate=getDateInDays(user.returnDate);
       let currentDate=getDateInDays();
       let subscriptionDate=getDateInDays(user.subscriptionDate);
       let subscriptionExpiration= subscriptionType(subscriptionDate);

       console.log("returnDate", returnDate);
       console.log("currentDate", currentDate);
       console.log("subscriptionType", subscriptionType);
       console.log("subscriptionDate", subscriptionDate);
       console.log("subscriptionExpiration", subscriptionExpiration );

       const data ={
        ... user,
        SubcriptionExpired :subscriptionExpiration < currentDate,
        daysleftForExpiration : subscriptionExpiration <= currentDate ? 0 : subscriptionExpiration - currentDate,
        fine : returnDate < currentDate ? subscriptionExpiration <= currentDate  ? 100 :50:0, 
    };
    return res.status(200).json({
        succces : true,
        message : "Subscription detail for  the  user  is ", 
        data :data, 

      });    
    });
   // return 

module.exports=router;   
//app.listen(PORT, ()=>{
  //  console.log('Server is running  at  port  ${PORT}')
//})


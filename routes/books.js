
const express = require("express");
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");
//const  app = express();


//const router = express.Router();
const router = express.Router();


router.get("/", (req,res) => {
   res
   .status(200)
   .json({ status: true, data : books,   message : "Got  all  the  books" });

});


//module.exports = router;
//const  PORT = 8081;

router.get("/:id", (req,res) =>{
    const {id} =req.params;
    const book =books.find((each)=> each.id ===id); 
    if  (!books) {
        return res.status(404).json({
        success: false,
        message : "Book not found !!!",
 
         });
        } 
     return res.status(200).json({
        success : true,
        message : "found  books  by  their  Id",
        data : book
      });
 });
//router.get("/issued", (req,res)=> {
router.get("/issued/by-user", (req,res)=> {    
      const  userwithTheIssuedBooks = users.filter((each)=>{
         if(each.issuedBook) return each;
      });
      const issuedBooks = [];
      userwithTheIssuedBooks.forEach((each) => {
         const  book =books.find((book)=>(book.id=each.issuedBook));
         book.issuedBy =each.name;
         book.issuedDate=each.issuedDate;
         books.returnedDate=each.returnedDate;
         issuedBooks.push(book);

      }); 
      if (issuedBooks.length===0){
         return res.status(404).json({
            suceess : false,
            message : "No books  have  been  issued  yet"
           }); 
        }  
         return res.status(200).json({
            success : true,
            message : "User with  Issued  Books... ",
            data : issuedBooks,
      });
    });
    

//     module.exports=router;
  
 //app.post("/", (req,res) =>{
  //   const {id,name, surname,email, subscriptionType, subscriptionDate} = req.body;
   //  const user =users.find((each)=> each.id ===id); 
    // if  (user) {
      //   return res.status(404).json({
        //     success: false,
         //    message : "User with this  id Exists !!!",
 
        // });/
    // } 
    // users.push({
      //   id,name,surname, email,subscriptionType,subscriptionDate }
    //  );
    // return res.status(201).json({
      //   success : true,
       //  message : "user added  successfully",
         // data : user
// });
// });
 router.post("/", (req,res)=> { 
    const {data}=req.body;

    if (!data){
        return res.status(400).json({
            success : false,
            message : "No data  To Add a Book",
        });
       }
    //const allBooks = { ... books, data};  
    const  book = books.find((each)=> each.id === data.id);
    if(book) {
        return res.status(404).json({
            success : false,
            message :  "id  already Exists"
        });
    }
    const  allBooks = [...books, data];
    return  res.status(200).json({
        success : true,
       // message : "Added  book  successfully",
        data : allBooks,
    });

    });



 router.put("/updateBook/:id", (req,res) =>{
     const { id } = req.params;
     const { data } = req.body;   
     
     const book =books.find((each)=> each.id ===id); 
     if  (!book) {
         return res.status(400).json({
             success: false,
             message : "Books Not  Found for  theis  ID",
 
         });
     } 
     const updateData=books.map((each)=> {
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
         message : "Updated  a  Book  by  their  id !!",
         data : updateData,
 });
 });
 
 //app.delete("/:id", (req,res) =>{
   //  const {id } = req.params;
        
     
     //const user =users.find((each)=> each.id ===id); 
     //if  (!user) {
       //  return res.status(404).json({
         //    success: false,
          //   message : "User Doesn't Exist !!!",
 
         //});
    // } 
    // const index=users.indexOf(user) ;
      //   users.splice(index,1)
     //return res.status(200).json({
       //      success : true,
        //     message : "Deleted User..",
         //     data : users
    // })
     
    // })
     
 
// app.get("*", (req,res)=>{
  //   res.status (404).json({
    //     message: "This route doesn't exist"
    // });
 
 //});
 //app.listen(PORT, ()=>{
  //   console.log('Server is running  at  port  ${PORT}')
 //})
 module.exports = router;
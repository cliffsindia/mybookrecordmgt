const mongoose = require("mongoose");


function DbcConnection() {

    const DB_URL = process.env.MONGO_URL;
     
       mongoose.connect(DB_URL, {

         useNewUrlParser: true,
         useUnifiedTopology: true,
    });
}
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error !!"));
db.once("open", function(){
       console.log("DB Connected !!")
    })


module.exports=DbcConnection;


//const mongoose = require("mongoose");
//console.log(mongoose)
//function DbConnection() {
 // const DB_URL = process.env.MONGO_URL;
  //console.log(DB_URL)
 // mongoose.connect(DB_URL, {
   // useNewUrlParser: true,
   // useUnifiedTopology: true,
 // });
//}

//const db = mongoose.connection;
//db.on("error", console.error.bind(console, "Connection Errors"));

//db.once("open", function(){
 // console.log("DB Connected !!")
//})
//module.exports = DbConnection;
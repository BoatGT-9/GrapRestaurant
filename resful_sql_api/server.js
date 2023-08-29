const express = require("express");
const cors = require("cors");
const sql = require("./model/db");
const restaurantRouter = require("./Routes/restaurant.route.js");
const notfoundmiddleware = require('./middleware/not-fond.js')

const PORT = 5000;

// สร้าง เซอร์วิส 
const app = express();

//use middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.listen(PORT,()=>{
    console.log("Server is runing on http://localhost:"+PORT);
});

app.use("/",restaurantRouter);
app.use(notfoundmiddleware);
console.log("รันได้แล้ว");
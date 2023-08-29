const mysql = require('mysql');
const dbconfig = require("../config/db.config");

//สร้าง database  และต่อ server

const connection = mysql.createConnection({
    host:dbconfig.HOST,
    user:dbconfig.USER,
    password:dbconfig.PASSWORD,
    database:dbconfig.DB
});

// เปิด sql และต่อเข้าไป  open MYSQL Connection
connection.connect(
    (error)=>{
        if(error) throw error;
        console.log("SuccessFully connected to the database .....");
    }
);

module.exports = connection;
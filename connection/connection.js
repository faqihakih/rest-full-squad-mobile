const mysql = require('mysql');

const conn = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "api-squad-mobile"
})

conn.connect((error) => {
    error ? console.error("Connection error bos") : console.log("Connect To Database");
})

module.exports = conn;
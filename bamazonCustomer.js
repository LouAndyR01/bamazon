//mysql node package
var mysql = require("mysql");

//inquirer package 
var inquirer = require("inquirer");



//create connection with the server and database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",

//password and DB
    password: "smu2019",
    database: "bamazon_DB",
});

connection.connect(function (err) {
    if (err) throw err;
    // console.log("hello");

    showProducts();
});

function showProducts(){
    connection.query("SELECT * FROM products", function (err, res){
        if (err) throw err;
        console.log(res);
        initialize()
    });
};

/////---------------------------------------------/////




  


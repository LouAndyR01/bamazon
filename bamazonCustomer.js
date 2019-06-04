//mysql node package
var mysql = require("mysql");

//inquirer package 
var inquirer = require("inquirer");

var Table = require("cli-table2");
//create connection with the server and database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",

//password and DB
    password: "smu2019",
    database: "bamazon_DB",
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId);

});

var viewProducts = function(){
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
      if (err) throw err;
      var displayTable = new Table ({
        head: ["Item ID", "Product Name", "Category", "Price", "Quantity"],
        colWidths: [15,30,30,15,15]
      });
      for (var i = 0; i < res.length; i++){
        displayTable.push(
          [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
        );
      }
      console.log(displayTable.toString());
      buyPrompt();
    });
  }
  
  function buyPrompt(){
    inquirer.prompt([
      {
        name: "ID",
        type: "input",
        message: "Enter the ID of the product you would like to buy",
        filter: Number
      },
      {
        name: "Quantity",
        type: "input",
        message: "How many of this product would you like to buy?",
        filter: Number
      },
    ]).then(function(input){
      var idInput = input.ID;
      var quantityInput = input.Quantity;
      placeOrder(idInput, quantityInput);
    });
  };
  
  function placeOrder(ID, amtNeeded){
    connection.query("Select * FROM products WHERE item_id = " + ID, function(err,res){
      if(err){console.log(err)};
      if(amtNeeded <= res[0].stock_quantity){
        var totalPrice = res[0].price * amtNeeded;
        console.log("Your order has been completed");
        console.log("Your total for " + amtNeeded + " " + res[0].product_name + " is " + totalPrice + ".");
  
        connection.query("UPDATE products SET stock_quantity =  " + (res[0].stock_quantity - amtNeeded) + " WHERE item_id = " + ID);
      } else {
        console.log("Sorry we are out of " + res[0].product_name + "!");
      };
      viewProducts();
  
    });
  
  };
  
  viewProducts();




   





  


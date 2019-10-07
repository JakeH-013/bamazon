//requirers
var mysql = require("mysql");
var inquirer = require("inquirer");

//establishes connection to database
var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "",
    database: "bamazon"
});

//connects to database
connection.connect(function (err) {
    if (err) throw err;
    inventory();
});

//function to display inventory
function inventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        //organizes the collumns i wish to display for each item
        for (var i = 0; i < res.length; i++) {
            console.log(`ID: ${res[i].id} || Name: ${res[i].product_name} || Department: ${res[i].department_name} || Price: $${res[i].price}`)
        }
        shopping();
    })
}

//function to begin the checkout process
function shopping() {
    inquirer.prompt([
        {
            name: "idSearch",
            type: "input",
            message: "Please enter the id of the product you would like."
        },
        {
            name: "quantity",
            type: "input",
            message: "How much would you like?"
        }
    ]).then(function (response) {
        //sets inputs to variables and pushes them into the purchase function
        var requestedId = response.idSearch;
        var desiredQuantity = response.quantity;
        purchase(requestedId, desiredQuantity);
    });
};

//function to check if there is enough of the desired item in stock and if so, removes that amount and displays the cost
function purchase(itemId, neededQuant) {
    console.log(itemId)
    connection.query(`SELECT * FROM products WHERE id = ${itemId}`, function (err, res) {
        if (err) throw err;
        console.log(res)
        if(res[0].stock_quantity < neededQuant) {
            console.log("Insufficient stock! Sorry. Please check again.")
        } else {
            connection.query(`UPDATE products SET stock_quantity = ${res[0].stock_quantity} - ${neededQuant} WHERE id = ${itemId}`);
            //sets price to a variable for easy use
            var total = res[0].price * neededQuant;
            console.log(`
Your total today comes up to ${total}. Thank you for shopping and please come again.
            `)
        }
        connection.end();
    });
};

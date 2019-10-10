DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price INT NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Bread", "Food", 6, 100),
        ("Broadsword", "Home Defense", 150, 40), 
        ("Beginner's Bee Hive", "Gardening", 30, 30), 
        ("Soap", "Hygiene", 4, 200), 
        ("Wintel 11 CPU", "Electronics", 230, 150),
        ("Alligator", "Pets", 128, 50),
        ("Sneakers", "Clothing", 25, 200),
        ("RPG", "Home Defense", 400, 25),
        ("Respirator", "Outdoors", 130, 60),
        ("Hair brush", "Hygiene", 8, 200);
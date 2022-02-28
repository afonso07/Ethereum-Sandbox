/*
https://trufflesuite.com/docs/truffle/getting-started/running-migrations.html#:~:text=readability%20and%20comprehension.-,artifacts.require(),%C2%B6,-At%20the%20beginning
At the beginning of the migration, we tell Truffle which contracts we'd like 
to interact with via the artifacts.require() method. This method is similar to 
Node's require, but in our case it specifically returns a contract abstraction 
that we can use within the rest of our deployment script.
*/
var TodoList = artifacts.require("./TodoList.sol")

module.exports = function(deployer){
    deployer.deploy(TodoList)
}
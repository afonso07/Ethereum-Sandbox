// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.12; // Source files can (and should) be annotated with a version pragma to reject compilation with future compiler versions that might introduce incompatible changes. 


contract TodoList{
    /**
    Setting the variable to public allows the variiable to be accessed
    outside of the contract. Solidity automatically creates a taskCount()
    function to access this value
     */ 
    uint public taskCount = 0;
}
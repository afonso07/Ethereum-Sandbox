// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.12; // Source files can (and should) be annotated with a version pragma to reject compilation with future compiler versions that might introduce incompatible changes. 


contract TodoList{

    // This gets run once when the contract is deployed, creating a defaut task
    constructor(){
        createTask("Default task");
    }

    /**
    Setting the variable to public allows the variiable to be accessed
    outside of the contract. Solidity automatically creates a taskCount()
    function to access this value
     */ 
    uint public taskCount = 0;

    struct Task{
        uint id;
        string content;
        bool completed;
    }

    // This is a mapping of task ID to Task
    mapping(uint => Task) public tasks;

    //A function that creates and adds a task to the mappings
    function createTask(string memory _content) public{
        taskCount ++;
        tasks[taskCount] = Task(taskCount, _content, false);
    }
}
// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.12; // Source files can (and should) be annotated with a version pragma to reject compilation with future compiler versions that might introduce incompatible changes.

contract TodoList {
    // This gets run once when the contract is deployed, creating a defaut task
    constructor() {
        createTask("Default task");
    }

    /**
    Setting the variable to public allows the variiable to be accessed
    outside of the contract. Solidity automatically creates a taskCount()
    function to access this value
     */
    uint256 public taskCount = 0;

    struct Task {
        uint256 id;
        string content;
        bool completed;
    }

    // Event interface
    event TaskCreated(uint256 id, string content, bool completed);
    event TaskCompleted(uint256 id, bool completed);

    // This is a mapping of task ID to Task
    mapping(uint256 => Task) public tasks;

    //A function that creates and adds a task to the mappings
    function createTask(string memory _content) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _content, false);
        emit TaskCreated(taskCount, _content, false);
    }

    // Ints are passed by value rather than reference therefore we can't use the memory keyword
    //https://ethereum.stackexchange.com/questions/83602/data-location-can-only-be-specified-for-array-struct-or-mapping-types-but-mem
    function toggleCompleted(uint256 _id) public {
        Task memory _task = tasks[_id];
        _task.completed = !_task.completed;
        tasks[_id] = _task;
        emit TaskCompleted(_id, _task.completed);
    }
}

const TodoList = artifacts.require("./TodoList.sol");

/*
. this , inside the arrow function, implies that the function does not have a this value of its own. They don't define their own context since it doesn't have its own this context. They inherit that from the parent scope whenever you call this .
*/
contract("TodoList", (accounts) => {
  // This is a test hook, run before each test is run
  before(async () => {
    this.todoList = await TodoList.deployed();
  });

  it("deploys successfully", async () => {
    const address = await this.todoList.address;
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  });

  it("lists tasks", async () => {
    const taskCount = await this.todoList.taskCount();
    const task = await this.todoList.tasks(taskCount);
    assert.equal(task.id.toNumber(), taskCount.toNumber());
    assert.equal(task.content, "Default task");
    assert.equal(task.completed, false);
    assert.equal(taskCount.toNumber(), 1);
  });

  it('creates tasks', async () => {
    const result = await this.todoList.createTask('A new task')
    const taskCount = await this.todoList.taskCount()
    assert.equal(taskCount, 2)
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), 2)
    assert.equal(event.content, 'A new task')
    assert.equal(event.completed, false)
  })
});

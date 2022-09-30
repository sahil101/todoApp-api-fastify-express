const table = "Tasks";
class Task {
  constructor(title, description, status) {
    this.title = title;
    this.description = description;
    this.stat = status;
  }

  save() {
    const createdAt = new Date().toString();
    const updatedAt = new Date().toString();
    const _id = "id" + Math.random().toString(16).slice(2);
    const newTask = {
      ...this,
      createdAt,
      updatedAt,
    };
    var params = {
      TableName: table,
      Item: {
        _id: _id,
        info: newTask,
      },
    };
    this.params = params;
  }
}
module.exports = Task;

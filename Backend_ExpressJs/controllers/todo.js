const Task = require("../models/todoHandler");
const aws = require("../config/util").getConnection();
const table = "Tasks";

//post request to add new tasks
exports.postAddTask = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const status = "Not Done";
  const task = new Task(title, description, status);
  task.save();
  console.log(task.params);
  aws.put(task.params, function (err, data) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(task.params.Item);
    }
  });
};

//get request to list all the tasks
exports.getTasks = (req, res, next) => {
  var params = {
    TableName: table,
    ProjectionExpression: "#id ,info",
    ExpressionAttributeNames: {
      "#id": "_id",
    },
  };
  aws.scan(params, function (err, data) {
    if (err) {
      res.status(500).json(err);
    } else {
      return res.status(200).json(data);
    }
  });
};

//get request of specific id
exports.getTask = (req, res, next) => {
  const id = req.params.id;
  var params = {
    TableName: table,
    Key: {
      _id: id,
    },
  };
  aws.get(params, function (err, data) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(data);
    }
  });
};

//delete request for deleting a task
exports.deleteTask = (req, res, next) => {
  const id = req.params.id;
  var params = {
    TableName: table,
    Key: {
      _id: id,
    },
  };
  aws.delete(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to delete item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
      res.json(err);
    } else {
      console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
      res.json(data);
    }
  });
};

//post request to update existing task
exports.updateTask = (req, res, next) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const stat = req.body.stat;
  const updatedAt = new Date().toString();
  var params = {
    TableName: table,
    Key: {
      _id: id,
    },
    UpdateExpression:
      "set info.stat=:s, info.description=:d, info.title=:t, info.updatedAt=:u",
    ExpressionAttributeValues: {
      ":s": stat,
      ":d": description,
      ":t": title,
      ":u": updatedAt,
    },
    ReturnValues: "UPDATED_NEW",
  };
  aws.update(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to update item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
      res.status(500).json(err);
    } else {
      console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
      res.status(200).json(data);
    }
  });
};

const express = require("express");
const controllers = require("../controllers/todo");
const router = express.Router();
router.post("/add-task", controllers.postAddTask);

router.get("/get-tasks", controllers.getTasks);

router.post("/update-task/:id", controllers.updateTask);

router.get("/get-tasks/:id", controllers.getTask);

router.delete("/delete-task/:id", controllers.deleteTask);

module.exports = router;

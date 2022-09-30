const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const TEST_FILE = require("./test.json");
const fs = require("fs");
const app = express();

const todoRoutes = require("./routes/todo");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.delete("/test", (req, res, next) => {
  var testObject = req.body;
  console.log(testObject)
  res.status(204).send({id: testObject.test})
});
app.use("/todo", todoRoutes);
app.use((req, res, next) => {
  return res.status(404).send({
    error: "Page not found",
  });
});

app.listen(3000, "localhost");

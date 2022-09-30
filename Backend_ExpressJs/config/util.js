var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
  accessKeyId: "xxxxxx",
  secretAccessKey: "xxxxxx",
});
var params = {
  TableName: "Tasks",
  KeySchema: [
    { AttributeName: "_id", KeyType: "HASH" }, //Partition key
  ],
  AttributeDefinitions: [{ AttributeName: "_id", AttributeType: "S" }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

const docClient = new AWS.DynamoDB();

docClient.createTable(params, function (err, data) {
  if (err) {
    console.error(
      "Unable to create table. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      "Created table. Table description JSON:",
      JSON.stringify(data, null, 2)
    );
  }
});
exports.getConnection = () => {
  const Client = new AWS.DynamoDB.DocumentClient();
  return Client;
};

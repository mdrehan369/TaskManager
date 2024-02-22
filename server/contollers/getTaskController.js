import { AWS_config } from "../AWSConfig.js";
import AWS from "aws-sdk";

export const getTaskController = (req, res) => {
  const username = req.params.username;

  AWS.config.update(AWS_config.aws_remote_config);
  const docClient = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: AWS_config.aws_table_name,
    FilterExpression: "contains(#username, :username)",
    ExpressionAttributeNames: { "#username": "username" },
    ExpressionAttributeValues: {
      ":username": username,
    },
  };

  docClient.scan(params, function (err, data) {
    if (err) console.log(err);
    else res.status(200).send(data);
  });
};

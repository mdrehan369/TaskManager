import { AWS_config } from "../AWSConfig.js";
import AWS from "aws-sdk";

export const updateTaskController = (req, res) => {
    try{
  
    AWS.config.update(AWS_config.aws_remote_config);
    const docClient = new AWS.DynamoDB.DocumentClient();
  
    const { title, description, dueDate, id} = req.body;
    const params = {
      TableName: AWS_config.aws_table_name,
      Key: {
          "id": id
      },
      UpdateExpression: "set title = :x, description = :y, dueDate = :z",
      ExpressionAttributeValues: {
          ":x": title,
          ":y": description,
          ":z": dueDate
      }
  };
  
  docClient.update(params, function(err, data) {
      if (err) res.send({success: false, message: err});
      else res.status(200).send({success: true, data});
  });
    }catch(e) {
      res.status(500).send({success: false, message: e});
    }
  }
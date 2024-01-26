import { AWS_config } from "../AWSConfig.js";
import AWS from "aws-sdk";

export const addTaskController =  async (req, res) => {
    try {
      AWS.config.update(AWS_config.aws_remote_config);
      const docClient = new AWS.DynamoDB.DocumentClient();
  
      const { username, title, description, dueDate, id} = req.body;
      const taskObj = {
        username,
        title,
        description,
        dueDate,
        id
      };
  
      const params = {
        TableName: AWS_config.aws_table_name,
        Item: taskObj,
      };
  
      docClient.put(params, function (err, data) {
        if (err) {
          res.send({
            success: false,
            message: err,
          });
        } else {
          res.send({
            success: true,
            message: "Task Added",
            task: data,
          });
        }
      });
    } catch (e) {
      res.sendStatus(500).send(e);
    }
  }
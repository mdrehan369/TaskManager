import { AWS_config } from "../AWSConfig.js";
import AWS from "aws-sdk";

export const deleteTaskController = (req, res) => {

    try {
      AWS.config.update(AWS_config.aws_remote_config);
      const docClient = new AWS.DynamoDB.DocumentClient();
  
      const Item = {
        Key: {
          id: req.params.id
        },
        TableName: AWS_config.aws_table_name,
       };
  
       docClient.delete(Item, function(err, data) {
        if (err) {
          res.status(403).send({success: false, err})
        }
        else {
          res.status(200).send({success: true, data});
        }
      });
  
    }catch(e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
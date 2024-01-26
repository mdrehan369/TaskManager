import 'dotenv/config'
import AWS from "aws-sdk"

export const AWS_config = {
    aws_table_name: process.env.AWS_TABLENAME,
    aws_remote_config: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: process.env.AWS_REGION,
    }
}

export const createTable = () => {

  AWS.config.update(AWS_config.aws_remote_config);
  const Client = new AWS.DynamoDB();

  var params = {
      TableName: process.env.AWS_TABLENAME,
      KeySchema: [
          { AttributeName: "id", KeyType: "HASH"},  //Partition key
      ],
      AttributeDefinitions: [
          { AttributeName: "id", AttributeType: "S" },
      ],
      ProvisionedThroughput: {
          ReadCapacityUnits: 10,
          WriteCapacityUnits: 10
      }
  };

  Client.createTable(params, function(tableErr, tableData) {
      if (tableErr) {
          return;
      } else {
          console.log("Created table successfully!");
      }
  })
}
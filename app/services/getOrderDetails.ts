import { documentClient, dynamoDB } from "../utils/config";
import createError from "http-errors";
import { OrdersTable } from "../utils/constants";
import AWS from "aws-sdk";



export const getOrderDetails = async (params) => {

    try {
        let query = {
          Statement: `SELECT * FROM "${OrdersTable}" where OrderId = '${params}'`,
        };
        var result = await dynamoDB.executeStatement(query).promise()
        var converted = result?.Items?.map((el) =>
        AWS.DynamoDB.Converter.unmarshall(el)
  );
      } catch (error: any) {
        console.error(error);
        throw new createError.InternalServerError(error);
      }
      return {
        statusCode: 200,
        body: converted,
      };
    };
    
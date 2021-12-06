import AWS from "aws-sdk";
import createError from "http-errors";
import { documentClient } from "../utils/config";
import { OrdersTable } from "../utils/constants"; 

export const SaveOrder = async (orderRequest: any) => {
  try {
    let strBody =  JSON.stringify(orderRequest)
    console.info(`Save Brand Begins: String request - ${strBody}`);
    console.info(`Save Brand Begins: Service Table - ${OrdersTable}'-'${orderRequest}`);
    await documentClient
      .put({
        TableName: OrdersTable,
        Item: orderRequest,
      })
      .promise();

    console.info("Save Brand Service End:", orderRequest);
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
  return {
    statusCode: 200,
    body: JSON.stringify(orderRequest),
  };
};
 
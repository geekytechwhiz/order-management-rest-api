import { documentClient } from "../utils/config";
import { OrdersTable } from "../utils/constants";
import createError from "http-errors";

export const editOrderStatus = async (orderStatusrequest: any) => {
  try {
    const params = {
      TableName: OrdersTable,
      Key: {
        OrderId: orderStatusrequest.OrderId,
        CustomerId: orderStatusrequest.CustomerId,
      },
      ExpressionAttributeNames: {
        "#OrderStatus": "OrderStatus",
        "#LastUpdatedDate": "UpdatedAt",
      },
      ExpressionAttributeValues: {
        ":OrderStatus": orderStatusrequest.OrderStatus,
        ":LastUpdatedDate": orderStatusrequest.LastUpdatedDate,
      },
      UpdateExpression:
        "SET #OrderStatus = :OrderStatus, #LastUpdatedDate = :LastUpdatedDate",
      ReturnValues: "ALL_NEW",
    };

    let strBody = JSON.stringify(orderStatusrequest);
    console.info(`Edit Order Begins: String request - ${strBody}`);
    console.info(`Edit Order - ${params}`);
    console.info(
      `Edit Order Begins: Service Table - ${OrdersTable}'-'${orderStatusrequest.OrderId}`
    );

    await documentClient.update(params).promise();

    console.info("Edit Order Service End:", orderStatusrequest);
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
  return {
    statusCode: 200,
    body:orderStatusrequest,
  };
};

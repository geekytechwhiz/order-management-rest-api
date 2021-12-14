import middy from "@middy/core";
import cors from "@middy/http-cors";
import { updateOrderStatusModel } from "../model/updateOrderStatusModel";
import { editOrderStatus } from "../services/editOrderStatus";
import createError from "http-errors";

const updateOrderStatus = async (event: any) => {
  if (event.body == null) {
    return new createError.NotFound("empty boady");
  }
  console.info("Request Event", event);
  console.info("Request Body", event.body);
  let orderStatusModel: updateOrderStatusModel = JSON.parse(event.body);
  const now = new Date().toISOString();
  const orderStatusrequest = {
    OrderId: orderStatusModel.OrderId,
    CustomerId: orderStatusModel.CustomerId,
    OrderStatus: orderStatusModel.OrderStatus,
    LastUpdatedDate: now,
  };
  let response = await editOrderStatus(orderStatusrequest);
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
export const handler = middy(updateOrderStatus).use(cors());

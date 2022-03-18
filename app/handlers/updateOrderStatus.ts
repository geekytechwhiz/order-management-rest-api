import middy from "@middy/core";
import cors from "@middy/http-cors";
import { updateOrderStatusModel } from "../model/updateOrderStatusModel";
import { editOrderStatus } from "../services/editOrderStatus";
import createError from "http-errors";
import { ValidateHeader, MakeHeaderRequest } from "../utils/commonMidleware";

const updateOrderStatus = async (event: any) => {
  try {
    let validateResponse = ValidateHeader(event["headers"]);
    if (!validateResponse.Status) {
      return {
        statusCode: 200,
        body: JSON.stringify(validateResponse),
      };
    }
    const headerRequest = MakeHeaderRequest(event["headers"]);

    console.log("Header", headerRequest);

    if (event.body == null) {
      return new createError.NotFound("empty boady");
    }
    console.info("Request Event", event);
    console.info("Request Body", event.body);
    let orderStatusModel: updateOrderStatusModel = JSON.parse(event.body);
    const now = new Date();

    const orderStatusrequest = {
      OrderId: orderStatusModel.OrderId,
      CustomerId: orderStatusModel.CustomerId,
      OrderStatus: orderStatusModel.OrderStatus,
      UpdatedAt: now.toLocaleString(),
    };
    let response = await editOrderStatus(orderStatusrequest);
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
  
};
export const handler = middy(updateOrderStatus).use(cors());

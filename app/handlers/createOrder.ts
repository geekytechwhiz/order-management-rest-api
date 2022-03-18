import middy from "@middy/core";
import cors from "@middy/http-cors";
import { OrderDetailsResponseModel } from "../model/orderDataModel";
import { SaveOrder } from "../services/saveOrder";
import { MakeHeaderRequest, ValidateHeader } from "../utils/commonMidleware";
import createError from "http-errors";

const createBrand = async (event: any) => {
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

    let orderRegstermodel: OrderDetailsResponseModel = JSON.parse(event.body);
    let headers = event.headers;
    console.info("Request Event", event);
    console.info("Request Body", event.body);
    const OrderId = "OR" + new Date().getTime().toString();
    const now = new Date();
    const endDate = new Date();
    endDate.setHours(now.getHours() + 1);

    const orderRequest: any = {
      OrderId: OrderId,
      CustomerId: orderRegstermodel.CustomerId,
      UserId: orderRegstermodel.UserId,
      TraceId: headers["TraceId"],
      DeliveryMode: orderRegstermodel.DeliveryMode,
      UserType: orderRegstermodel.UserType,
      PaymentId: orderRegstermodel.PaymentId,
      DeliveryAddress: orderRegstermodel.DeliveryAddress,
      ProductType: orderRegstermodel.ProductType,
      CreatedAt: now.toLocaleString(),
      UpdatedAt: now.toLocaleString(),
      OrderStatus: "Pending",
    };
    let response = await SaveOrder(orderRequest);
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};

export const handler = middy(createBrand).use(cors());

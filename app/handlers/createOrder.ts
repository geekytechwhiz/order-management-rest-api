import middy from "@middy/core";
import cors from "@middy/http-cors";
import { v4 as uuid } from "uuid";
import { OrderDetailsResponseModel } from "../model/orderDataModel";
// import { createOrderchema } from "../schemas/createOrderchema";
import { SaveOrder } from "../services/saveOrder";
import commonMidleware from "../utils/commonMidleware";

const createBrand = async (event: any, context: any) => {
 
  let orderRegstermodel: OrderDetailsResponseModel = JSON.parse(event.body);
  let headers=event.headers
  console.info("Request Event", event);
  console.info("Request Body", event.body);
  const OrderId = "OR" + new Date().getTime().toString();
  const now = new Date();
  const endDate = new Date();
  endDate.setHours(now.getHours() + 1);

  const orderRequest: any = {
    OrderId: OrderId,
    CustomerId:orderRegstermodel.CustomerId,
    UserId: orderRegstermodel.UserId,
    TraceId: headers['TraceId'],
    DeliveryMode: orderRegstermodel.DeliveryMode,
    UserType: orderRegstermodel.UserType,
    PaymentId:orderRegstermodel.PaymentId,
    DeliveryAddress: orderRegstermodel.DeliveryAddress,
    ProductType: orderRegstermodel.ProductType,
    CreatedAt: now.toISOString(),
    UpdatedAt: now.toISOString(),
    OrderStatus: "Pending",
    BrandId:orderRegstermodel.BrandId
  };
  let response = await SaveOrder(orderRequest);
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

export const handler = middy(createBrand).use(cors());

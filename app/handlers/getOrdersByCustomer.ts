import middy from "@middy/core";
import cors from "@middy/http-cors";
import { getAllCustomerOrders } from "../services/getAllOrdersByCustomer";

const getAllOrders = async(event:any, context:any)=> {
const params = event.pathParameters.CustomerId

let response = await getAllCustomerOrders(params);

return {
  statusCode: 200,
  body: JSON.stringify(response)
};

};
export const handler = middy(getAllOrders).use(cors())
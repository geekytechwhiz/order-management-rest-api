import middy from "@middy/core";
import cors from "@middy/http-cors";
import { getOrderDetails } from "../services/getOrderDetails";

const getOrder = async(event:any, context:any)=> {
const params = event.pathParameters.OrderId

let response = await getOrderDetails(params);

return {
  statusCode: 200,
  body: JSON.stringify(response)
};

};
export const handler = middy(getOrder).use(cors())
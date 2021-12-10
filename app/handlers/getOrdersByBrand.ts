import middy from "@middy/core";
import cors from "@middy/http-cors";
import { getAllBrandOrders } from "../services/getAllOrdersByBrand";

const getAllOrders = async(event:any, context:any)=> {
const params = event.pathParameters.BrandId

let response = await getAllBrandOrders(params);

return {
  statusCode: 200,
  body: JSON.stringify(response)
};

};
export const handler = middy(getAllOrders).use(cors())
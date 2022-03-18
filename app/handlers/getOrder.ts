import middy from "@middy/core";
import cors from "@middy/http-cors";
import { getOrderDetails } from "../services/getOrderDetails";
import { ValidateHeader, MakeHeaderRequest } from "../utils/commonMidleware";
import createError from "http-errors";

const getOrder = async (event: any) => {
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

    const params = event.pathParameters.OrderId;

    let response = await getOrderDetails(params);

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};
export const handler = middy(getOrder).use(cors());

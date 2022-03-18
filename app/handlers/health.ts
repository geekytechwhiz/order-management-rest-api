import commonMidleware, { MakeHeaderRequest, ValidateHeader } from "../utils/commonMidleware";
import createError from "http-errors";

export const healthCheck= async(event:any)=> { 
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

    let respose = { status: true, message: "Order Api Health Check Passed" };
    return {
      statusCode: 200,
      body: JSON.stringify(respose),
    };
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
  
}

 export const handler = commonMidleware(healthCheck);
    
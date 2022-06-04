import { getAllCustomerOrders } from '../services/getAllOrdersByCustomer';
import {
  ValidateHeader,
  ResponseBuilder,
  MakeHeaderRequest,
} from '../utils/helper';
import createError from 'http-errors';

export const handler = async (event: any) => {
  try {
    console.info(
      `Request Body: ${JSON.stringify(
        event.body
      )} Method: POST Action:getOrdersByCustomer `
    );

    let validateResponse = ValidateHeader(event['headers']);

    if (!validateResponse.Status) {
      return ResponseBuilder(validateResponse, 400);
    }

    const headerRequest: any = MakeHeaderRequest(event['headers']);
    console.info(
      `Request: Path: ${event.path}, Method:${
        event.httpMethod
      } Headers:${JSON.stringify(event.headers)}, Body:${JSON.stringify(
        event.body
      )} TraceId: ${headerRequest.TraceId}`
    );
    const params = event.pathParameters.CustomerId;
    if (!params) {
      const err = new createError.NotFound('Body Missing');
      return ResponseBuilder(err, 400);
    }

    let response = await getAllCustomerOrders(params);

    return ResponseBuilder(response, 200);
  } catch (error: any) {
    console.info(
      `Error: Path: ${event.path}, Method:${
        event.httpMethod
      } Error:${JSON.stringify(error)}`
    );
    return ResponseBuilder(error, 500);
  }
};

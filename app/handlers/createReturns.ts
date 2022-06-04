import createError from 'http-errors';
import { ReturnOrderModel } from '../model/returnOrderModel';
import { SaveReturns } from '../services/saveReturnOrders';
import { ORDER_STATUS_RETURN } from '../utils/constants';
import {
  MakeHeaderRequest,
  ResponseBuilder,
  ValidateHeader,
} from '../utils/helper';
import { ValidatePostReturnOrder } from '../utils/validator';

export const handler = async (event: any) => {
  try {
    console.info(
      `Request Body: ${JSON.stringify(
        event.body
      )} Method: POST Action:CreateOrder `
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
    if (!event.body) {
      const err = new createError.NotFound('Body Missing');
      return ResponseBuilder(err, 400);
    }
    let requestBody: ReturnOrderModel = JSON.parse(event.body);
    console.info('Request Body', event.body);
    const now = new Date();
    const validate = ValidatePostReturnOrder(requestBody);
    if (!validate.isValid) {
      return ResponseBuilder(validate.message, 400);
    }

    const response = await Promise.all(
      requestBody.Orders.map(async (request) => {
        try {
          const returnId = 'ROR' + new Date().getTime().toString();
          request['ReturnOrderId'] = returnId;
          request['ReturnDate'] = now.toISOString();
          request['CreatedDate'] = now.toISOString();
          request['UpdatedAt'] = now.toISOString();
          request['OrderStatus'] = ORDER_STATUS_RETURN;
          return await SaveReturns(request);
        } catch (err) {
          console.log(err);
          throw err;
        }
      })
    );
    console.info(
      `Response Body: ${{
        statusCode: 200,
        body: JSON.stringify(response),
      }} Method: POST Action:createBrand `
    );
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

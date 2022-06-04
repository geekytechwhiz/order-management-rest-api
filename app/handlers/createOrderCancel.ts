import createError from 'http-errors';
import { CancelledOrderModel } from '../model/returnOrderModel';
import { SaveOrderCancel } from '../services/saveOrderCancel';
import { ORDER_STATUS_CANCELLED } from '../utils/constants';
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
      )} Method: POST Action:CreateOrderCancel `
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
    let requestBody: CancelledOrderModel = JSON.parse(event.body);
    console.info('Request Body', event.body);
    const now = new Date();
    const validate = ValidatePostReturnOrder(requestBody);
    if (!validate.isValid) {
      return ResponseBuilder(validate.message, 400);
    }

    const response = await Promise.all(
      requestBody.Orders.map(async (request) => {
        try {
          const timpstamp = 'COR' + new Date().getTime().toString();
          request['CancelledOrderId'] = timpstamp;
          request['CancelledDate'] = now.toISOString();
          request['CreatedDate'] = now.toISOString();
          request['UpdatedAt'] = now.toISOString();
          request['OrderStatus'] = ORDER_STATUS_CANCELLED;
          return await SaveOrderCancel(request);
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

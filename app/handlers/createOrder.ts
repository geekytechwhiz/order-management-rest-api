import createError from 'http-errors';
import { OrderDetailsResponseModel } from '../model/orderDataModel';
import { SaveOrder } from '../services/saveOrder';
import { ORDER_STATUS_LIST } from '../utils/constants';
import {
  MakeHeaderRequest,
  ResponseBuilder,
  ValidateHeader,
} from '../utils/helper';
import { ValidatePostOrder } from '../utils/validator';

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
    let orderRequestModel: OrderDetailsResponseModel = JSON.parse(event.body);
    let headers = event.headers;
    console.info('Request Body', event.body);
    const OrderId = 'OR' + new Date().getTime().toString();
    const now = new Date();
    orderRequestModel.OrderStatus = ORDER_STATUS_LIST[0];
    orderRequestModel.TraceId = headers['TraceId'];
    orderRequestModel.OrderDate = now.toISOString();
    orderRequestModel.CreatedDate = now.toISOString();
    orderRequestModel.UpdatedAt = now.toISOString();
    orderRequestModel.OrderId = OrderId;
    const validate = ValidatePostOrder(orderRequestModel);
    if (!validate.isValid) {
      return ResponseBuilder(validate.message, 400);
    }

    let response = await SaveOrder(orderRequestModel);
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

import { UpdateReturnRequestModel } from '../model/updateOrderStatusModel';
import { editReturns } from '../services/editReturns';
import {
  MakeHeaderRequest,
  ResponseBuilder,
  ValidateHeader,
} from '../utils/helper';
import { ValidatePatchReturnOrder } from '../utils/validator';

export const handler = async (event: any) => {
  try {
    console.info(
      `Request Body: ${JSON.stringify(
        event.body
      )} Method: PATCH Action:UpdateReturnOrder `
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
    console.info('Request Event', event);
    console.info('Request Body', event.body);
    let requestModel: UpdateReturnRequestModel = JSON.parse(event.body);
    const validate = ValidatePatchReturnOrder(requestModel);
    if (!validate.isValid) {
      return ResponseBuilder(validate.message, 400);
    }
    const now = new Date().toISOString();
    const result = await Promise.all(
      requestModel.Orders.map(async (model) => {
        try {
          const orderStatusRequest = {
            ReturnOrderId: model.ReturnOrderId,
            OrderId: model.OrderId,
            CustomerId: model.CustomerId,
            OrderStatus: model.OrderStatus,
            HandoverTime: model.HandoverTime,
            LastUpdatedDate: now,
            TrackingId: model.TrackingId,
          };
          return await editReturns(orderStatusRequest);
        } catch (err) {
          console.log(err);
          throw err;
        }
      })
    );

    console.info(
      `Response Body: ${{
        statusCode: 200,
        body: JSON.stringify(result),
      }} Method: POST Action:createBrand `
    );
    return ResponseBuilder(result, 200);
  } catch (error: any) {
    console.info(
      `Error: Path: ${event.path}, Method:${
        event.httpMethod
      } Error:${JSON.stringify(error)}`
    );
    return ResponseBuilder(error, 500);
  }
};

import createError from 'http-errors';
import { getCancelledOrders } from '../services/getCancelledOrders';
import {
  MakeHeaderRequest,
  ResponseBuilder,
  ValidateHeader,
} from '../utils/helper';

export const handler = async (event: any) => {
  try {
    console.info(
      `Request Body: ${JSON.stringify(
        event.body
      )} Method: POST Action:getCancelledOrderByBrandId `
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
    const params = event.pathParameters.BrandId;
    if (!params) {
      const err = new createError.NotFound('Body Missing');
      return ResponseBuilder(err, 400);
    }

    let response = await getCancelledOrders(params);

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

import createError from 'http-errors';
import { documentClient } from '../utils/config';
import { ORDERS_TABLE } from '../utils/constants';

export const SaveOrder = async (orderRequest: any) => {
  try {
    console.info(
      `Request: Method: POST Name: SaveOrder: String request - ${JSON.stringify(
        orderRequest
      )}`
    );
    await documentClient
      .put({
        TableName: ORDERS_TABLE,
        Item: orderRequest,
      })
      .promise();

    console.info('Save Brand Service End:', orderRequest);

    return orderRequest;
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};

import createError from 'http-errors';
import { documentClient } from '../utils/config';
import { CANCELLED_TABLE } from '../utils/constants';

export const SaveOrderCancel = async (orderRequest: any) => {
  try {
    console.info(
      `Request: Method: POST Name: SaveOrderCancel: String request - ${JSON.stringify(
        orderRequest
      )}`
    );
    await documentClient
      .put({
        TableName: CANCELLED_TABLE,
        Item: orderRequest,
      })
      .promise();

    console.info('Save Order :', orderRequest);

    return orderRequest;
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};

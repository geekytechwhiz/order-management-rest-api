import createError from 'http-errors';
import { documentClient } from '../utils/config';
import { RETURNS_TABLE } from '../utils/constants';

export const SaveReturns = async (orderRequest: any) => {
  try {
    console.info(
      `Request: Method: POST Name: SaveOrder: String request - ${JSON.stringify(
        orderRequest
      )}`
    );
    await documentClient
      .put({
        TableName: RETURNS_TABLE,
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

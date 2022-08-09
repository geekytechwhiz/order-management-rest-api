import createError from 'http-errors';
import { CartDetails } from '../model/orderDataModel';
import { documentClient } from '../utils/config';
import { CART_TABLE } from '../utils/constants';

export const SaveItemToCart = async (request: CartDetails) => {
  try {
    console.info(
      `Request: Method: POST Name: SaveItemToCart: String request - ${JSON.stringify(
        request
      )}`
    );
    await documentClient
      .put({
        TableName: CART_TABLE,
        Item: request,
      })
      .promise();

    console.info('SaveItemToCart Service End:', request);

    return request;
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};

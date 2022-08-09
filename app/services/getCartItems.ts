import AWS from 'aws-sdk';
import createError from 'http-errors';
import { dynamoDB } from '../utils/config';
import { CART_TABLE } from '../utils/constants';

export const getCartItems = async (params) => {
  try {
    let query = {
      Statement: `SELECT * FROM "${CART_TABLE}" where CustomerId = '${params}'`,
    };
    var result = await dynamoDB.executeStatement(query).promise();
    var converted = result?.Items?.map((el) =>
      AWS.DynamoDB.Converter.unmarshall(el)
    );
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
  return converted;
};

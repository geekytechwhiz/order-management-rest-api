import AWS from 'aws-sdk';
import createError from 'http-errors';
import { dynamoDB } from '../utils/config';
import { RETURNS_TABLE } from '../utils/constants';

export const getAllBrandReturns = async (params) => {
  try {
    console.info(
      `Request: Method: POST Name: SaveOrder: String request - ${JSON.stringify(
        params
      )}`
    );
    let query = {
      Statement: `SELECT * FROM "${RETURNS_TABLE}" where BrandId = '${params}'`,
    };
    var result = await dynamoDB.executeStatement(query).promise();
    var converted = result?.Items?.map((el) =>
      AWS.DynamoDB.Converter.unmarshall(el)
    );

    return converted;
  } catch (error: any) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};

import { documentClient, dynamoDB } from "../utils/config";
import createError from "http-errors";
import { OrdersTable } from "../utils/constants";



export const getAllBrandOrders = async (params) => {

    try {
        let query = {
          Statement: `SELECT * FROM "${OrdersTable}" where BrandId = '${params}'`,
        };
        var result = await dynamoDB.executeStatement(query).promise()

      } catch (error: any) {
        console.error(error);
        throw new createError.InternalServerError(error);
      }
      return {
        statusCode: 200,
        body: JSON.stringify(result),
      };
    };
    
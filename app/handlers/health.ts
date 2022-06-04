import { ResponseBuilder } from '../utils/helper';

export const healthCheck = async () => {
  let response = { status: true, message: 'Order Api Health Check Passed' };
  return ResponseBuilder(response, 200);
};

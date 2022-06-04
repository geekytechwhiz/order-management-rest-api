class UpdateOrderStatusModel {
  OrderId: string;
  LastUpdatedDate: string;
  OrderStatus: string;
  CustomerId: string;
  HandoverTime: string;
  TrackingId: string;
}

export class UpdateOrderModel {
  Orders: Array<UpdateOrderStatusModel>;
}
export class UpdateReturnRequestModel {
  Orders: Array<UpdateReturnModel>;
}
class UpdateReturnModel {
  ReturnOrderId: string;
  OrderId: string;
  LastUpdatedDate: string;
  OrderStatus: string;
  CustomerId: string;
  HandoverTime: string;
  TrackingId: string;
}

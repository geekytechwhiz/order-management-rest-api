export class OrderDetailsResponseModel {
  OrderId: string;
  BrandId: string;
  Amount: string;
  SLA: string;
  Tags: string;
  HandoverTime: string;
  ProductId: string;
  DeliveryDetails: DeliveryAddress;
  DeliveryMode: string;
  UserId: string;
  UserType: Array<string>;
  PaymentMode: string;
  ProductName: string;
  Size: string;
  ProductCategory: string;
  Quantity: number;
  Discount: number;
  MRP: number;
  DeliveryCharge: number;
  GstPercentage: number;
  IgstPercentage: number;
  GstAmount: number;
  IgstAmount: number;
  SgtPercentage: number;
  SstAmount: number;
  Cess: number;
  TotalValue: number;
  ImageLink: string;
  TotalTaxAmount: number;
  TotalAmount: number;
  ProductType: string;
  OrderDate: string;
  CreatedDate: string;
  UpdatedAt: string;
  LastUpdatedDate: string;
  OrderStatus: string;
  CustomerDetails: CustomerDetails;
  PaymentId: string;
  PaymentStatus: string;
  TraceId: string;
  CustomerId: string;
}
export class DeliveryAddress {
  Name: string;
  HouseName: string;
  PinCode: number;
  State: string;
  Landmark: string;
  Street: string;
  City: string;
  District: string;
}
export class CartDetails {
  CartId: string;
  ProductName: string;
  Size: string;
  ProductCategory: string;
  ProductId: string;
  Quantity: string;
  Discount: string;
  MRP: number;
  BrandId: string;
  SellingPrice: number;
  Url: string;
  StockStatus: string;
  Model: string;
  TraceId: string;
  CustomerId: string;
}
export class CustomerDetails {
  Mobile: number;
  CustomerId: string;
  Name: string;
  EMail: string;
  GSTN: string;
}

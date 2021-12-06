export class OrderDetailsResponseModel {
  OrderId: string;
  ProductId: string;
  DeliveryAddress: DeliveryAddress;
  DeliveryMode: string;
  UserId: string;
  UserType:Array<string>;
  PaymentMode: string;
  ProductDetails: ProductDetails;
  ProductType: string;
  CreatedDate: string;
  LastUpdatedDate: string;
  OrderStatus: string;
  CustomerDetails: UserDetails;
  PaymentId:string;
  TraceId:string;
}
// export class OrderDataResponseModel {
//   Requested: ProductTypeResponseModel;
//   Confirmed: ProductTypeResponseModel;
// }
// export class ProductTypeResponseModel {
//   Standard: Array<OrderDetailsResponseModel>;
//   Exclusive: Array<OrderDetailsResponseModel>;
// }

export class DeliveryAddress {
  HouseNoOrFlatNoOrHouseName: string;
  Locality: string;
  PinCodeOrZipcode: number;
  State: string;
  Landmark: string;
  StreetOrApartmentName: string;
  City: string;
  District: string;
}
export class ProductDetails {
  ProductName: string;
  Size: string;
  ProductCategory: string;
  ProductId: string;
  MRP: number;
  BrandId: string;
  SellingPrice: number;
}
export class UserDetails {
  MobileNumber: number;
  UserId: string;
  UserName: string;
  EMail: string;
}

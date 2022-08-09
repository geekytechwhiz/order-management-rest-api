export const ORDERS_TABLE = 'Orders-dev';
export const RETURNS_TABLE = 'Returns-dev';
export const CANCELLED_TABLE = 'Cancelled-dev';
export const CART_TABLE = 'Cart-dev';
export const HeaderConstants = {
  CustomerID: 'X-MIBAPI-CustomerID',
  CustomerType: 'X-MIBAPI-CustomerType',
  Source: 'X-MIBAPI-Source',
  Token: 'X-MIBAPI-Token',
};

export const ORDER_STATUS_LIST = [
  'PUBLISHED',
  'CANCELLED',
  'PENDING_LABEL',
  'DELIVERED',
  'PENDING_HANDOVER',
  'IN_TRANSIT',
  'READY_TO_DISPATCH',
];

export const ORDER_STATUS_PENDING_LABEL = 'PENDING_LABEL';

export const MANDATORY_FIELD_POST_ORDER = [
  'BrandId',
  'ImageLink',
  'Amount',
  'Quantity',
  'Discount',
  'MRP',
  'DeliveryCharge',
  'GstAmount',
  'IgstAmount',
  'SgtPercentage',
  'SstAmount',
  'TotalValue',
  'TotalTaxAmount',
  'TotalAmount',
];

export const MANDATORY_FIELD_UPDATE_ORDER = [
  'OrderStatus',
  'CustomerId',
  'OrderId',
  'HandoverTime',
];

export const MANDATORY_FIELD_POST_RETURN_ORDER = [
  'OrderStatus',
  'CustomerId',
  'ReturnOrderId',
];
export const MANDATORY_FIELD_POST_CANCEL_ORDER = [
  'OrderStatus',
  'CustomerId',
  'OrderId',
];

export const MANDATORY_FIELD_POST_CART = [
  'ProductName',
  'CustomerId',
  'Quantity',
  'SellingPrice',
];

export const ORDER_STATUS_RETURN = 'RETURNED';

export const ORDER_STATUS_CANCELLED = 'CANCELLED';
export const ORDER_STATUS_RETURNED_READY_FOR_PICKUP =
  'RETURNED_READY_FOR_PICKUP';
export const RETURN_ORDER_STATUS_LIST = [
  'RETURNED',
  'APPROVED',
  'REJECTED',
  'RETURNED_READY_FOR_PICKUP',
  'DELIVERED',
  'IN_TRANSIT',
];

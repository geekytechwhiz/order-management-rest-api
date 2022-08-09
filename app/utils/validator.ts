import { UpdateOrderModel } from '../model/updateOrderStatusModel';
import {
  MANDATORY_FIELD_POST_CANCEL_ORDER,
  MANDATORY_FIELD_POST_CART,
  MANDATORY_FIELD_POST_ORDER,
  MANDATORY_FIELD_POST_RETURN_ORDER,
  MANDATORY_FIELD_UPDATE_ORDER,
  ORDER_STATUS_LIST,
  RETURN_ORDER_STATUS_LIST,
} from './constants';

export const ValidatePostOrder = (modelObj) => {
  let response = {
    isValid: true,
    message: '',
  };
  let errors: any = [];
  MANDATORY_FIELD_POST_ORDER.forEach((x) => {
    if (modelObj[x] == null || modelObj[x] === '') {
      errors.push(x);
    }
  });
  if (errors.length > 0) {
    response = {
      isValid: false,
      message: `Required fields ${[...errors]}`,
    };
  }
  return response;
};
export const ValidateUpdateOrder = (updateOrders: UpdateOrderModel) => {
  let response = {
    isValid: true,
    message: '',
  };
  let errors: any = [];
  if (
    !updateOrders ||
    !updateOrders.Orders ||
    updateOrders.Orders.length <= 0
  ) {
    response = {
      isValid: false,
      message: `Required fields Orders`,
    };
  }
  updateOrders.Orders.forEach((obj) => {
    MANDATORY_FIELD_UPDATE_ORDER.forEach((x) => {
      if (!obj[x] || obj[x] === '') {
        errors.push(x);
      }
    });
    if (obj && !ORDER_STATUS_LIST.includes(obj.OrderStatus)) {
      return {
        isValid: false,
        message: `Order Status must be any of  ${[...ORDER_STATUS_LIST]}`,
      };
    }
  });

  if (errors.length > 0) {
    response = {
      isValid: false,
      message: `Required fields ${[...errors]}`,
    };
  }
  return response;
};

export const ValidatePostReturnOrder = (returnOrders) => {
  let response = {
    isValid: true,
    message: '',
  };
  let errors: any = [];
  if (
    !returnOrders ||
    !returnOrders.Orders ||
    returnOrders.Orders.length <= 0
  ) {
    response = {
      isValid: false,
      message: `Required fields Orders`,
    };
  }
  returnOrders.Orders.forEach((obj) => {
    MANDATORY_FIELD_POST_RETURN_ORDER.forEach((x) => {
      if (!obj[x] || obj[x] === '') {
        errors.push(x);
      }
    });
  });

  if (errors.length > 0) {
    response = {
      isValid: false,
      message: `Required fields ${[...errors]}`,
    };
  }
  return response;
};

export const ValidatePostOrderCancel = (returnOrders) => {
  let response = {
    isValid: true,
    message: '',
  };
  let errors: any = [];
  if (
    !returnOrders ||
    !returnOrders.Orders ||
    returnOrders.Orders.length <= 0
  ) {
    response = {
      isValid: false,
      message: `Required fields Orders`,
    };
  }
  returnOrders.Orders.forEach((obj) => {
    MANDATORY_FIELD_POST_CANCEL_ORDER.forEach((x) => {
      if (!obj[x] || obj[x] === '') {
        errors.push(x);
      }
    });
  });

  if (errors.length > 0) {
    response = {
      isValid: false,
      message: `Required fields ${[...errors]}`,
    };
  }
  return response;
};

export const ValidatePatchReturnOrder = (returnOrders) => {
  let response = {
    isValid: true,
    message: '',
  };
  let errors: any = [];
  if (
    !returnOrders ||
    !returnOrders.Orders ||
    returnOrders.Orders.length <= 0
  ) {
    response = {
      isValid: false,
      message: `Required fields Orders`,
    };
  }
  returnOrders.Orders.forEach((obj) => {
    MANDATORY_FIELD_POST_RETURN_ORDER.forEach((x) => {
      if (!obj[x] || obj[x] === '') {
        errors.push(x);
      }
    });

    if (obj && !RETURN_ORDER_STATUS_LIST.includes(obj.OrderStatus)) {
      return {
        isValid: false,
        message: `Order Status must be any of  ${[...ORDER_STATUS_LIST]}`,
      };
    }
  });

  if (errors.length > 0) {
    response = {
      isValid: false,
      message: `Required fields ${[...errors]}`,
    };
  }
  return response;
};

export const ValidatePostCart = (modelObj) => {
  let response = {
    isValid: true,
    message: '',
  };
  let errors: any = [];
  MANDATORY_FIELD_POST_CART.forEach((x) => {
    if (modelObj[x] == null || modelObj[x] === '') {
      errors.push(x);
    }
  });
  if (errors.length > 0) {
    response = {
      isValid: false,
      message: `Required fields ${[...errors]}`,
    };
  }
  return response;
};

import {
  UPDATE_ORDERS,
  SET_ORDER_TO_SHIPPING,
  UPDATE_ISlOADING_ORDERS,
  OPEN_MODAL_CREATE_SHIPPING,
} from "actions/orders.actions";

export const initialStateOrdersReducer = {
  isLoadingOrders: false,
  orders: [],
  totalOrders: 0,
  totalPages: 1,
  openModalCreateShipping: false,
  orderToShipping: {
    orderNumber: 0,
    recipientsName: "",
    recipientsAddress: "",
    recipientsProvinceName: "",
    recipientsCityName: "",
    packages: [],
    name: "",
  },
  shipping: {
    cityCode: "",
    orderId: "",
    packageId: "",
    warehouseId: "",
    delivery: "",
    labelId: "",
    serviceLevel: 0,
    valorFleteContraEntrega: "",
    customerName: "",
    recipientsAddress: "",
  },
};

export default function ordersReducer(state, action) {
  switch (action.type) {
    case UPDATE_ORDERS:
      return {
        ...state,
        orders: action.payload.orders,
        totalOrders: action.payload.total,
        totalPages: action.payload.totalPages,
        isLoadingOrders: action.payload.isLoading,
      };
    case UPDATE_ISlOADING_ORDERS:
      return { ...state, isLoadingOrders: action.payload };
    case SET_ORDER_TO_SHIPPING:
      return {
        ...state,
        orderToShipping: action.payload,
        openModalCreateShipping: true,
      };
    case OPEN_MODAL_CREATE_SHIPPING:
      return { ...state, openModalCreateShipping: action.payload };
    default:
      return state;
  }
}

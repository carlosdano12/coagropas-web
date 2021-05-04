import React, { useEffect, useReducer, useState } from "react";
import ordersReducer, {
  initialStateOrdersReducer,
} from "reducers/Orders.reducer";
import {
  UPDATE_ORDERS,
  UPDATE_ISlOADING_ORDERS,
  SET_ORDER_TO_SHIPPING,
  OPEN_MODAL_CREATE_SHIPPING,
  OPEN_MODAL_CREATE_VENTA,
} from "../actions/orders.actions";
import { getAllVentas } from "../services/ordersService";
import useUser from "hooks/useLogin";
import { useHistory } from "react-router-dom";

const defaultPagination = {
  limit: 10,
  page: 1,
};

const OrdersContext = React.createContext(undefined);

export function OrdersContextProvider(props) {
  const { children } = props;
  const history = useHistory();

  const [pagination, setPagination] = useState(defaultPagination);
  const [orderPackages, setOrderPackages] = useState({});
  const [orderPackageShipping, setOrderPackageShipping] = useState({
    cityCode: "",
    labelId: "",
    packages: [],
    serviceLevel: 0,
    delivery: "",
    orderId: 0,
    warehouseId: "",
  });

  const updatePagination = (state) => {
    setPagination((oldState) => ({ ...state }));
  };

  const [
    {
      orders,
      totalOrders,
      isLoadingOrders,
      openModalCreateShipping,
      openModalVenta,
      shipping,
      venta,
    },
    dispatch,
  ] = useReducer(ordersReducer, initialStateOrdersReducer);
  const { jwt } = useUser();

  useEffect(() => {}, []);

  const getOrders = (page, limit, search) => {
    dispatch({ type: UPDATE_ISlOADING_ORDERS, payload: true });
    getAllVentas({ jwt, pagination: { limit, page } })
      .then((orderResponse) => {
        if (orderResponse) {
          dispatch({
            type: UPDATE_ORDERS,
            payload: {
              orders: orderResponse.orders,
              total: orderResponse.totalCount,
              totalPages: orderResponse.totalPages,
              isLoading: false,
            },
          });
          updatePagination({
            ...pagination,
          });
        }
      })
      .catch((err) => {
        console.log(err.response?.status);

        if (err.response?.status === 403) {
          history.push(`/admin/connect-store`);
        }
      })
      .finally(() => {
        dispatch({
          type: UPDATE_ISlOADING_ORDERS,
          payload: false,
        });
      });
  };

  const setVenta = (venta) => {
    dispatch({ type: SET_ORDER_TO_SHIPPING, payload: venta });
  };

  const handleOpenModalCreateShipping = (value) => {
    dispatch({ type: OPEN_MODAL_CREATE_SHIPPING, payload: value });
  };
  const handleOpenModalVenta = (value) => {
    dispatch({ type: OPEN_MODAL_CREATE_VENTA, payload: value });
  };
  return (
    <OrdersContext.Provider
      value={{
        isLoadingOrders: isLoadingOrders,
        orders: orders,
        totalOrders,
        getOrders,
        setVenta,
        openModalCreateShipping,
        openModalVenta,
        handleOpenModalCreateShipping,
        handleOpenModalVenta,
        updatePagination,
        pagination,
        shipping,
        orderPackages,
        setOrderPackages,
        venta,
        orderPackageShipping,
        setOrderPackageShipping,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export const useOrdersContext = () => {
  const context = React.useContext(OrdersContext);
  if (!context) {
    throw new Error(
      "useOrderContext debe estar dentro del proveedor dentro de OrdersContextProvider"
    );
  }
  return context;
};

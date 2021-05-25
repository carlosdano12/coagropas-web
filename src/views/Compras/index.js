import { OrdersContextProvider } from "../../contextApi/OrdersContext";
import React from "react";
import Compras from "./Compras";

export default function (props) {
  return (
    <OrdersContextProvider>
      <Compras {...props} />
    </OrdersContextProvider>
  );
}

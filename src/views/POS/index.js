import POS from "./POS";
import { OrdersContextProvider } from "../../contextApi/OrdersContext";
import React from "react";

export default function (props) {
  return (
    <OrdersContextProvider>
      <POS {...props} />
    </OrdersContextProvider>
  );
}

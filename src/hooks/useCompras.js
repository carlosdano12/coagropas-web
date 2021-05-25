import { getAllVentas } from "../services/ordersService";
import useLogin from "hooks/useLogin";
import axios from "axios";

import { URL_VENTAS } from "../constants/urls";

export default function useCompras() {
  const { jwt } = useLogin();

  let headers = {
    Authorization: `Bearer ${jwt}`,
  };

  const getCompras = async () => {
    return await getAllVentas({ jwt });
  };
  const getOrdersByOrderNumber = async (orderNumber) => {
    return axios
      .get(`${URL_VENTAS}/packages/${orderNumber}`, { headers })
      .then((response) => {
        return response.data;
      });
  };

  return {
    getCompras,
    getOrdersByOrderNumber,
  };
}

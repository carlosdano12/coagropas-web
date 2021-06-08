import { getAllVentas } from "../services/ordersService";
import useLogin from "hooks/useLogin";
import axios from "axios";

import { URL_VENTAS } from "../constants/urls";

export default function useVentas() {
  const { jwt } = useLogin();

  let headers = {
    Authorization: `Bearer ${jwt}`,
  };

  const getVentas = async () => {
    return await getAllVentas({ jwt });
  };

  const crearVenta = async (data) => {
    const response = await axios.post(URL_VENTAS, data, { headers });
    if (response) {
      return response.data;
    }
  };

  return {
    getVentas,
    crearVenta,
  };
}

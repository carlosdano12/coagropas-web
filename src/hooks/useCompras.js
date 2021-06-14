import { getAllVentas } from "../services/ordersService";
import useLogin from "hooks/useLogin";
import axios from "axios";

import { URL_COMPRAS } from "../constants/urls";

export default function useCompras() {
  const { jwt } = useLogin();

  let headers = {
    Authorization: `Bearer ${jwt}`,
  };

  const getCompras = async () => {
    return (await axios.get(`${URL_COMPRAS}/hechas`, { headers })).data;
  };

  const crearCompra = async (data) => {
    const response = await axios.post(`${URL_COMPRAS}/hechas`, data, {
      headers,
    });
    if (response) {
      return response.data;
    }
  };

  return {
    getCompras,
    crearCompra,
  };
}

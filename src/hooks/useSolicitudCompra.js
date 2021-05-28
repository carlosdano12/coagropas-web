import useLogin from "hooks/useLogin";
import axios from "axios";

import { URL_SOLICITUDES_COMPRAS } from "../constants/urls";

export default function useSolicitudesCompras() {
  const { jwt } = useLogin();

  let headers = {
    Authorization: `Bearer ${jwt}`,
  };

  const getSolicitudesCompras = async () => {
    const response = await axios.get(`${URL_SOLICITUDES_COMPRAS}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  };

  return {
    getSolicitudesCompras,
  };
}

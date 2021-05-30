import useLogin from "hooks/useLogin";
import axios from "axios";

import {
  URL_SOLICITUDES_RECIBIR,
  URL_SOLICITUDES_TRANSPORTES,
} from "../constants/urls";

export default function useSolicitudesTransporte() {
  const { jwt } = useLogin();

  let headers = {
    Authorization: `Bearer ${jwt}`,
  };

  const getSolicitudesTransportes = async () => {
    const response = await axios.get(`${URL_SOLICITUDES_TRANSPORTES}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  };

  const confirmar = (data) => {
    const response = axios.put(URL_SOLICITUDES_RECIBIR, data, { headers });
    if (response) {
      return response.data;
    }
  };

  return {
    getSolicitudesTransportes,
    confirmar,
  };
}

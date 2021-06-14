import useLogin from "hooks/useLogin";
import axios from "axios";

import { URL_CLIENTES } from "../constants/urls";

export default function useClientes() {
  const { jwt } = useLogin();

  let headers = {
    Authorization: `Bearer ${jwt}`,
  };

  const getClientes = async () => {
    return (await axios.get(`${URL_CLIENTES}`, { headers })).data;
  };

  const getClienteById = async (id) => {
    return axios.get(`${URL_CLIENTES}/${id}`, { headers });
  };

  const addCliente = async (data) => {
    return (await axios.post(URL_CLIENTES, data, { headers })).data;
  };

  const updateCliente = async (data) => {
    return (
      await axios.put(`${URL_CLIENTES}/${data.id}`, data, {
        headers,
      })
    ).data;
  };

  return {
    getClientes,
    getClienteById,
    addCliente,
    updateCliente,
  };
}

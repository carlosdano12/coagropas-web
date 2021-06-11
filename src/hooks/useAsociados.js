import useLogin from "hooks/useLogin";
import axios from "axios";

import { URL_ASOCIADOS } from "../constants/urls";

export default function useAsociados() {
  const { jwt } = useLogin();

  let headers = {
    Authorization: `Bearer ${jwt}`,
  };

  const getAsociados = async () => {
    return (await axios.get(`${URL_ASOCIADOS}`, { headers })).data;
  };

  const getAsociadosRequest = async () => {
    return (await axios.get(`${URL_ASOCIADOS}/request`, { headers })).data;
  };

  const getAsociadoById = async (id) => {
    return axios.get(`${URL_ASOCIADOS}/${id}`, { headers });
  };

  const addAsociado = async (data) => {
    return (await axios.post(URL_ASOCIADOS, data, { headers })).data;
  };

  const addAsociadoRequest = async (data) => {
    return (await axios.post(`${URL_ASOCIADOS}/request`, data, { headers }))
      .data;
  };

  const updateAsociado = async (data) => {
    return (await axios.put(`${URL_ASOCIADOS}/${data.id}`, data, { headers }))
      .data;
  };

  return {
    getAsociados,
    getAsociadosRequest,
    getAsociadoById,
    addAsociado,
    addAsociadoRequest,
    updateAsociado,
  };
}

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
    return axios.get(`${URL_ASOCIADOS}/registrado/${id}`, { headers });
  };

  const addAsociado = async (data) => {
    return (await axios.post(URL_ASOCIADOS, data, { headers })).data;
  };

  const addAsociadoRequest = async (data) => {
    return (await axios.post(`${URL_ASOCIADOS}/request`, data, { headers }))
      .data;
  };

  const getAsociadoRequestById = async (id) => {
    return (await axios.get(`${URL_ASOCIADOS}/request/${id}`, { headers }))
      .data;
  };

  const updateAsociado = async (data) => {
    return (
      await axios.put(`${URL_ASOCIADOS}/registrado/${data.id_asociado}`, data, {
        headers,
      })
    ).data;
  };

  const updateAsociadoRequest = async (data) => {
    return (
      await axios.put(`${URL_ASOCIADOS}/request/${data.id}`, data, {
        headers,
      })
    ).data;
  };

  const updateRoles = async (data) => {
    return (
      await axios.put(
        `${URL_ASOCIADOS}/roles/${data.id}`,
        { roles: data.roles },
        {
          headers,
        }
      )
    ).data;
  };

  return {
    getAsociados,
    getAsociadosRequest,
    getAsociadoById,
    getAsociadoRequestById,
    addAsociado,
    addAsociadoRequest,
    updateAsociado,
    updateAsociadoRequest,
    updateRoles,
  };
}

import useLogin from "hooks/useLogin";
import axios from "axios";

import { URL_INSUMO } from "../constants/urls";

export default function useInsumos() {
  const { jwt } = useLogin();

  let headers = {
    Authorization: `Bearer ${jwt}`,
  };

  const getInsumos = async () => {
    return (await axios.get(`${URL_INSUMO}`, { headers })).data;
  };

  const getInsumoById = async (id) => {
    return axios.get(`${URL_INSUMO}/${id}`, { headers });
  };

  const addInsumo = async (data) => {
    return (await axios.post(URL_INSUMO, data, { headers })).data;
  };

  const updateInsumo = async (data) => {
    return (await axios.put(`${URL_INSUMO}/${data.id}`, data, { headers }))
      .data;
  };

  return {
    getInsumos,
    getInsumoById,
    addInsumo,
    updateInsumo,
  };
}

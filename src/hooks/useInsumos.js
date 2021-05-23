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

  const addInsumo = async (data) => {
    return (await axios.post(URL_INSUMO, data, { headers })).data;
  };

  const updateInsumo = async (data) => {
    return (await axios.put(URL_INSUMO, data, { headers })).data;
  };

  return {
    getInsumos,
    addInsumo,
    updateInsumo,
  };
}

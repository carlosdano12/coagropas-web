import useLogin from "hooks/useLogin";
import axios from "axios";

import { URL_NIAME } from "../constants/urls";

export default function useNiames() {
  const { jwt } = useLogin();

  let headers = {
    Authorization: `Bearer ${jwt}`,
  };

  const getNiames = async () => {
    return (await axios.get(`${URL_NIAME}`, { headers })).data;
  };

  const addNiame = async (data) => {
    return (await axios.post(URL_NIAME, data, { headers })).data;
  };

  const updateNiame = async (data) => {
    return (await axios.put(URL_NIAME, data, { headers })).data;
  };

  return {
    getNiames,
    addNiame,
    updateNiame,
  };
}

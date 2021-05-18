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

  return {
    getNiames,
  };
}

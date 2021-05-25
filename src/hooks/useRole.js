import useLogin from "hooks/useLogin";
import axios from "axios";

import { URL_ROLES } from "../constants/urls";

export default function useRole() {
  const { jwt } = useLogin();

  let headers = {
    Authorization: `Bearer ${jwt}`,
  };

  const getRoles = async () => {
    return (await axios.get(`${URL_ROLES}`, { headers })).data;
  };

  return {
    getRoles,
  };
}

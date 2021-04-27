import { useCallback, useContext, useState } from "react";
import Context from "contextApi/UserContext";
import { ACCESS_TOKEN_NAME, USER_KEY_STORE } from "constants/securityConts";
import { URL_LOGIN } from "constants/urls";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function useLogin() {
  const [state, setState] = useState({ loading: false, error: false });
  const history = useHistory();
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useUser debe ser usado dentro de UserContextProvider");
  }

  const login = useCallback(
    ({ email, password }) => {
      setState({ loading: true, error: false });
      axios
        .post(URL_LOGIN, { username: email, password: password })
        .then((response) => {
          let err = false;
          if (response.data?.accessToken) {
            window.localStorage.setItem(
              ACCESS_TOKEN_NAME,
              response.data.accessToken
            );
            const userToSave = {
              nombre: response.data.nombre,
              roles: response.data.roles,
              isConfigurationComplete: true,
            };

            window.localStorage.setItem(
              USER_KEY_STORE,
              JSON.stringify(userToSave)
            );
            context.setJwt(response.data.accessToken);
            context.setUser(userToSave);
            window.localStorage.setItem("shopName", response.data.shopName);
            context.setShopName(response.data.shopName);

            history.push("/admin/dashboard");
            console.log("response:", response);
          } else {
            err = true;
          }
          setState({ loading: false, error: err });
        })
        .catch((err) => {
          window.localStorage.removeItem(ACCESS_TOKEN_NAME);
          window.localStorage.removeItem(USER_KEY_STORE);
          setState({ loading: false, error: true });
          console.error(err);
        });
    },
    [context.setJwt]
  );

  const logout = useCallback(() => {
    window.localStorage.removeItem(ACCESS_TOKEN_NAME);
    window.localStorage.removeItem(USER_KEY_STORE);
    window.localStorage.removeItem("shopName");
    window.localStorage.removeItem("roleUser");
    context.setJwt(null);
    const newUser = {
      nombre: "",
      roles: [],
      isConfigurationComplete: false,
    };

    context.setUser(newUser);
    history.push("/login");
  }, [context.setJwt]);

  const setIsConfigurationComplete = (value) => {
    const newUser = {
      nombre: context.user?.nombre || "",
      roles: context.user?.roles || [],
      isConfigurationComplete: value,
    };

    context.setUser(newUser);
    const userStored = JSON.parse(
      window.localStorage.getItem(USER_KEY_STORE) || ""
    );
    userStored.isConfigurationComplete = true;
    window.localStorage.setItem(USER_KEY_STORE, JSON.stringify(userStored));
  };

  return {
    isLogged: Boolean(context.jwt),
    jwt: context.jwt,
    setJwt: context.setJwt,
    isLoading: state.loading,
    login,
    logout,
    hasLoginError: state.error,
    user: context.user,
    setIsConfigurationComplete,
    shopName: context.shopName,
  };
}

// import React, { Fragment, useEffect } from 'react'
import axios from "axios";

import useCustomSnackbar from "components/useCustomSnackbar";

import { getAccessToken } from "../../services/authServices";

export default function useAxiosInterceptor() {
  const showNotification = useCustomSnackbar();

  const insterceptor = () => {
    axios.interceptors.request.use(
      (config) => {
        // config.withCredentials = true
        const token = getAccessToken();
        if (token) {
          return { ...config, headers: { Authorization: `Bearer ${token}` } };
        }

        return config;
      },
      (error) => Promise.reject(error)
    );
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (!error.response && !error.status) {
          showNotification("Error de conexión", "error");
          return Promise.reject(error);
        }
        switch (error.response.status) {
          case 400:
            if (error.response.data.message) {
              showNotification(error.response.data.message, "error");
            } else if (error.response.data.errors) {
              const errorApi = error.response.data.errors;
              for (const key in errorApi) {
                if (errorApi.hasOwnProperty(key)) {
                  const msgErrors = errorApi[key];
                  msgErrors.map((err) => {
                    showNotification(err, "error");
                  });
                }
              }
            } else {
              showNotification("(400) Solicitud no valida", "error");
            }
            break;
          case 401:
            window.location = "/login";
            break;
          case 404:
            showNotification("(404) El recurso no existe", "error");
            break;
          case 405:
            showNotification("(405) Método no permitido", "error");
            break;
          case 415:
            showNotification("(415) Media type no soportado", "error");
            break;
          case 500:
            showNotification("(500) Ocurrió un error en el servidor", "error");
            break;
          case 403:
            showNotification("(403) Usted no tiene permisos", "error");
            break;
          default:
            break;
        }
        return Promise.reject(error);
      }
    );
  };

  insterceptor();
}

import { URL_VENTAS } from "../constants/urls";
import axios from "axios";

export function getAllVentas({ jwt }) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`${URL_VENTAS}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (response.status === 200) {
        resolve(response.data);
      }
    } catch (error) {
      console.log(error);
      reject("Ocurrió un error, por favor contacta con soporte.");
    }
  });
}

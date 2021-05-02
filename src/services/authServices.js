import { ACCESS_TOKEN_NAME, USER_KEY_STORE } from "constants/securityConts";

export function isLoggedIn() {
  const isLogged = localStorage.getItem(USER_KEY_STORE);
  return !!(isLogged && isLogged === "true");
}

export function getAccessToken() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
  return accessToken || "";
}

export function getEmail() {
  const userDetail = localStorage.getItem();
  return userDetail ? userDetail.email : "";
}

export function getName() {
  const userDetail = localStorage.getItem();
  const userObject = JSON.parse(userDetail);

  console.log("el user detail", userObject);
  return userObject ? userObject.name : "";
}

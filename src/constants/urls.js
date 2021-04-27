export const URL_BASE =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";
export const URL_LOGIN = `${URL_BASE}/api/v1/auth/login`;

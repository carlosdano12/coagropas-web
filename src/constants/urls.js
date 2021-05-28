export const URL_BASE =
  process.env.NODE_ENV === "development" ? "http://localhost:3000/api/v1" : "";
export const URL_LOGIN = `${URL_BASE}/auth/login`;
export const URL_VENTAS = `${URL_BASE}/ventas`;
export const URL_SOLICITUDES_COMPRAS = `${URL_BASE}/compra/solicitudes`;
export const URL_NIAME = `${URL_BASE}/niame`;
export const URL_INSUMO = `${URL_BASE}/insumos`;
export const URL_ROLES = `${URL_BASE}/roles`;

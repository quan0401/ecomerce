import instance from "../axios/setup";

export const getOrdersAdmin = async (AbortController) => {
  return await instance.get("/api/orders/admin", {
    signal: AbortController.signal,
  });
};

export const getOrderById = async (id) => {
  return await instance.get("/api/orders/user/" + id);
};

export const maskOrderAsDelivered = async (id) => {
  return await instance.put("/api/orders/delivered/" + id);
};

export const createOrderApi = async (orderData) =>
  await instance.post("/api/orders", { ...orderData });

export const getOrdersUserApi = async () => await instance.get("/api/orders");

export const getOrdersForAnalysisApi = async (firstDate, abortController) => {
  const signal =
    abortController && abortController.signal ? abortController.signal : null;
  return await instance.get(`/api/orders/analysis?firstDate=${firstDate}`, {
    signal: signal,
  });
};

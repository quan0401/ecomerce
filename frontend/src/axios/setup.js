import axios from "axios";
import store from "../redux/store";
import { logoutState } from "../redux/actions/userActions";

const instance = axios.create({});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // return Promise.reject(error);
    const status = error.response.status;

    if (status === 401) store.dispatch(logoutState());
    return Promise.reject(error.response.data);
  }
);
export default instance;

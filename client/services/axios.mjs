import axios from "axios";

/**
 *
 *
 * This can be removed entirely later on.
 */

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_HOSTNAME || "localhost",
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("calling the refresh token api");
      // Handle 401 error here.
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

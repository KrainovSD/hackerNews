import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://hacker-news.firebaseio.com/v0/",
});

const tryHeader = "TRY";

axiosInstance.interceptors.response.use(
  async (response) => {
    //console.log(response.data);
    const originalConfig = response.config;
    if (+originalConfig.headers[tryHeader] >= 2 || response.data !== null)
      return response;
    originalConfig.headers[tryHeader] = originalConfig.headers[tryHeader]
      ? `${+originalConfig.headers[tryHeader] + 1}`
      : "1";
    await waitUntil();
    return axiosInstance.request(originalConfig);
  },
  async (err) => {
    return Promise.reject(err);
  }
);

const waitUntil = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};

export default axiosInstance;

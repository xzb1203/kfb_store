import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import showCodeMessage from '@/api/code';
import { formatJsonToUrlParams, instanceObject } from '@/utils/format';
import Aes from '@/utils/aes.js'; // 解密

const BASE_PREFIX = import.meta.env.VITE_API_BASEURL;
const WHITE_URL = ['/websocket/crypt/key', '/websocket/crypt/js/key', '/order/store/order/withPagingList/excel/export'];
// 创建实例
const axiosInstance: AxiosInstance = axios.create({
  // 前缀
  baseURL: BASE_PREFIX,
  // 超时
  timeout: 1000 * 30,
  // 请求头
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 解决后端的坑 todo
    if (config.url === '/organization/driver/user/keyword/withPagingList') {
      config.params.searchKeywords = config.params.searchKeywords ? config.params.searchKeywords : 1;
    }
    return Aes.encryptAesConfig(config);
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(response);
    const AesResponse: any = WHITE_URL.includes(response.config.url as string) ? response : Aes.decryptAes(response);
    if (AesResponse.data?.kfbCode !== '200' && !WHITE_URL.includes(response.config.url as string)) {
      ElMessage.error(AesResponse.data.kfbErrorMsg);
    }
    return AesResponse;
  },
  (error: AxiosError) => {
    const { response } = error;
    if (response) {
      ElMessage.error(showCodeMessage(response.status));
      return Promise.reject(response.data);
    }
    ElMessage.warning('网络连接异常,请稍后再试!');
    return Promise.reject(error);
  },
);
const service = {
  get: (url: string, data?: object, config?: object) => axiosInstance.get(url, { params: data, ...config }),
  post: (url: string, data?: object, config?: object) => axiosInstance.post(url, data, config),
  postParams: (url: string, params?: object) =>
    axiosInstance({
      url,
      method: 'POST',
      params,
    }),
  // put: (url: string, data?: object) => axiosInstance.put(url, data),
  put: (url: string, data?: object) =>
    axiosInstance({
      url,
      method: 'PUT',
      data,
    }),
  delete: (url: string, data?: object) =>
    axiosInstance({
      url,
      method: 'DELETE',
      data,
    }),
  deleteParams: (url: string, params?: object) => {
    return axiosInstance({
      url,
      method: 'DELETE',
      params,
    });
  },
  upload: (url: string, file: File, name = 'file') => {
    const formData = new FormData();
    formData.append(name, file);
    return axiosInstance.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getDownload: (url: string, params?: object) =>
    axiosInstance({
      url,
      method: 'GET',
      responseType: 'arraybuffer',
      params,
    }),
  postDownload: (url: string, params?: object) =>
    axiosInstance({
      url,
      method: 'POST',
      responseType: 'arraybuffer',
      params,
    }),
  download: (url: string, data: instanceObject) => {
    const downloadUrl = `${BASE_PREFIX}/${url}?${formatJsonToUrlParams(data)}`;
    window.location.href = downloadUrl;
  },
};

export default service;

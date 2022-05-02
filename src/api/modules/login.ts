import service from '@/api/http';

const loginApi = {
  postLogin: (data: object) => service.postParams(`/websocket/store/login`, data),
  postStoreInfo: () => service.postParams(`/websocket/find/user/jwt`),
  getCryptKey: () => service.get(`/websocket/crypt/key`),
  getDeliverClientKey: (params: object) => service.get(`/websocket/crypt/js/key`, params),
};

export default loginApi;

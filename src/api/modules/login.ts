import service from '@/api/http'

const loginApi = {
  postLogin: (data: object) => service.postParams(`/websocket/store/login`, data),
  getCryptKey: () => service.get(`/websocket/crypt/key`),
  getDeliverClientKey: (params: object) => service.get(`/websocket/crypt/js/key`, params),
}

export default loginApi

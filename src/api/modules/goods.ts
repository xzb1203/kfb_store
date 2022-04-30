import service from '@/api/http'

const prefix = '/goods/store/goods'
const goodsApi = {
  postStoreGoods: (data: object) => service.postParams(`${prefix}/withPagingList`, data),
}

export default goodsApi

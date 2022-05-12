import service from '@/api/http';

const prefix = '/goods/store';
const goodsApi = {
  postStoreGoods: (data: object) => service.postParams(`${prefix}/goods/withPagingList`, data),
  postServiceList: (data: object) => service.postParams(`${prefix}/service/withoutPagingList`, data),
  queryGoodsCountList: (storeId: string) => service.get(`${prefix}/goods/total/${storeId}`),
};

export default goodsApi;

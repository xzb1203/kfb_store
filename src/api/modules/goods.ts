import service from '@/api/http';

const prefix = '/goods/store';
const goodsApi = {
  postStoreGoods: (data: object) => service.postParams(`${prefix}/goods/withPagingList`, data),
  postServiceList: (data: object) => service.postParams(`${prefix}/service/withoutPagingList`, data),
  queryGoodsCountList: (storeId: string) => service.get(`${prefix}/goods/total/${storeId}`),
  queryGoodsGroup: (data: object) => service.postParams(`${prefix}/goods/group/withoutPagingList`, data),
  queryGoodsClass: (data: object) => service.get(`/system/goods/class/withoutPagingList`, data),
  postServeChange: (data: object) => service.postParams(`${prefix}/service/save`, data),
};

export default goodsApi;

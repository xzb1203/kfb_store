import service from '@/api/http';

const prefix = '/goods/store';
const goodsApi = {
  postStoreGoods: (data: object) => service.postParams(`${prefix}/goods/withPagingList`, data),
  postStoreThreeGoods: (data: object) => service.postParams(`${prefix}/goods/t/withPagingList`, data),
  postServiceList: (data: object) => service.postParams(`${prefix}/service/withoutPagingList`, data),
  queryGoodsCountList: (storeId: string) => service.get(`${prefix}/goods/total/${storeId}`),
  queryGoodsGroup: (data: object) => service.postParams(`${prefix}/goods/group/withoutPagingList`, data),
  queryGoodsClass: (data: object) => service.get(`/system/goods/class/withoutPagingList`, data),
  postServeChange: (data: object) => service.postParams(`${prefix}/service/save`, data),
  queryGoodsAllot: (data: object) => service.get(`${prefix}/goods/allot/record/order/withPagingList`, data),
  postGoodsAllot: (data: object) => service.post(`${prefix}/goods/allot`, data),
  getAllotDetail: (data: object) => service.get(`${prefix}/goods/allot/record/withPagingList`, data),
};

export default goodsApi;

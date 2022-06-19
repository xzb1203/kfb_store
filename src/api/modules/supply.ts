import service from '@/api/http';

const prefix = '';
const supplyApi = {
  // 获取平台供应商
  postOnlineSupplyList: (data: object) => service.postParams(`/organization/supplier/sale/find/by/store`, data),
  // 获取线下供应商
  postPrivateList: (data: object) => service.postParams(`/organization/private/supplier/withPagingList`, data),
  // 获取三包主机厂
  postMainEnginePlantsList: (data: object) => service.postParams(`/organization/mainEnginePlants/withPagingList`, data),
};

export default supplyApi;

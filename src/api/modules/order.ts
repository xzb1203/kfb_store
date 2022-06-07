import service from '@/api/http';

const prefix = '/order/store';
const orderApi = {
  postOrderWithPagingList: (data: object) => service.postParams(`${prefix}/order/withPagingList`, data),
  getOrderTotal: (storeId: string) => service.get(`${prefix}/order/total/${storeId}`),
  getOrderDetail: (orderId: string) => service.get(`${prefix}/order/infobypk/${orderId}`),
  postDownOrderExcel: (data: object) => service.postDownload(`${prefix}/order/withPagingList/excel/export`, data),
  postCreateOrder: (data: object) => service.postParams(`${prefix}/order/save`, data),
  postkeywordwithPagingList: (data: object) =>
    service.postParams(`/organization/driver/user/keyword/withPagingList`, data),
  putSaveOrder: (data: object) => service.put(`${prefix}/order/goods/unite/update`, data),
  putSaveFault: (data: object) => service.put(`${prefix}/order/fault/update`, data),
  deleteOrder: (data: object) => service.delete(`${prefix}/order/delete`, data),
  postOfflineList: (data: object) => service.postParams(`${prefix}/private/purchase/order/withPagingList`, data),
  postLineList: (data: object) => service.postParams(`${prefix}/purchase/order/withPagingList`, data),
};

export default orderApi;

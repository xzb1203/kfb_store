import service from '@/api/http';

const prefix = '/order/store/order';
const orderApi = {
  postOrderWithPagingList: (data: object) => service.postParams(`${prefix}/withPagingList`, data),
  getOrderTotal: (storeId: string) => service.get(`${prefix}/total/${storeId}`),
  getOrderDetail: (orderId: string) => service.get(`${prefix}/infobypk/${orderId}`),
  postDownOrderExcel: (data: object) => service.postDownload(`${prefix}/withPagingList/excel/export`, data),
  postCreateOrder: (data: object) => service.postParams(`${prefix}/save`, data),
  postkeywordwithPagingList: (data: object) =>
    service.postParams(`/organization/driver/user/keyword/withPagingList`, data),
  putSaveOrder: (data: object) => service.put(`${prefix}/goods/unite/update`, data),
  putSaveFault: (data: object) => service.put(`${prefix}/fault/update`, data),
  deleteOrder: (data: object) => service.delete(`${prefix}/delete`, data),
};

export default orderApi;

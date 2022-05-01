import service from '@/api/http';

const prefix = '/order/store/order';
const orderApi = {
  postOrderWithPagingList: (data: object) => service.postParams(`${prefix}/withPagingList`, data),
  getOrderTotal: (storeId: string) => service.get(`${prefix}/total/${storeId}`),
  postDownOrderExcel: (data: object) => service.postDownload(`${prefix}/withPagingList/excel/export`, data),
};

export default orderApi;

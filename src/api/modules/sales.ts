import service from '@/api/http';

const prefix = '';
const salesApi = {
  postSalesWithPagingList: (data: object) => service.postParams(`/order/store/sale/order/withPagingList`, data),
  postSalesWithPagingListSum: (data: object) => service.postParams(`/order/store/sale/order/withPagingList/sum`, data),
};

export default salesApi;

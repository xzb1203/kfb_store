import service from '@/api/http';

const prefix = '';
const salesApi = {
  postSalesWithPagingList: (data: object) => service.postParams(`/order/store/sale/order/withPagingList`, data),
};

export default salesApi;

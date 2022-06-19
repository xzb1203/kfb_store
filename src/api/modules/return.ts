import service from '@/api/http';

const prefix = '';
const returnApi = {
  postReturnWithPagingList: (data: object) =>
    service.postParams(`/order/store/return/goods/order/withPagingList`, data),
};

export default returnApi;

import service from '@/api/http';

const prefix = '/goods/store/goods/';
const purchaseApi = {
  postWarningInventory: (data: object) => service.postParams(`${prefix}warning/inventory`, data),
};

export default purchaseApi;

import service from '@/api/http';

const prefix = '';
const financialApi = {
  // 收支列表
  postFinancialBopList: (data: object) => service.postParams(`/organization/store/income/expend/withPagingList`, data),
  // 客户账单
  postUserBillList: (data: object) => service.postParams(`/organization/store/income/expend/driver/user/info`, data),
  // 供应商账单
  postSupplierList: (data: object) => service.postParams(`/organization/store/income/expend/supplier/info`, data),
  // 主机厂账单
  postMainengineplantsList: (data: object) =>
    service.postParams(`/organization/store/income/expend/mainengineplants/info`, data),
};

export default financialApi;

import service from '@/api/http';

const prefix = '';
const financialApi = {
  postFinancialBopList: (data: object) => service.postParams(`/organization/store/income/expend/withPagingList`, data),
};

export default financialApi;

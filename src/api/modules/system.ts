import service from '@/api/http';

const prefix = '';
const systemApi = {
  getPriceSet: (data: object) => service.get(`/organization/store/system/price`, data),
  setPrice: (data: object) => service.putParams(`/organization/store/system/price`, data),
  postStaffList: (data: object) => service.postParams(`/organization/user/store/staff/withPagingList`, data),
  postRoleList: (data: object) => service.postParams(`/organization/role/withoutPagingList`, data),
};

export default systemApi;

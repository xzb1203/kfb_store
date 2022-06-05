import service from '@/api/http';

const prefix = '/organization/driver/';
const customerApi = {
  postUserWithPagingList: (data: object) => service.postParams(`${prefix}/user/withPagingList`, data),
  postUserGroupList: (data: object) =>
    service.postParams(`/organization/store/driver/user/group/withoutPagingList`, data),
  getUserTotal: (storeId: string) => service.get(`${prefix}store/total/${storeId}`),
};

export default customerApi;

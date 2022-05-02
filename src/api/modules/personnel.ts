import service from '@/api/http';

const prefix = '/organization/user/store/staff/';
const personnelApi = {
  postPersonnelList: (data: object) => service.postParams(`${prefix}/withPagingList`, data),
};

export default personnelApi;

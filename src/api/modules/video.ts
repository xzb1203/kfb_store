import service from '@/api/http';

const prefix = '/system/file/video/';
const videoApi = {
  postWithPagingList: (data: object) => service.postParams(`${prefix}/withPagingList`, data),
};

export default videoApi;

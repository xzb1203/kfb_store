import service from '@/api/http';

const prefix = '/organization/driver';
const driverlApi = {
  getDriverCar: (data: object) => service.get(`${prefix}/user/car/withPagingList`, data),
};

export default driverlApi;

import service from '@/api/http';

const prefix = '';
const systemApi = {
  getPriceSet: (data: object) => service.get(`/organization/store/system/price`, data),
  setPrice: (data: object) => service.putParams(`/organization/store/system/price`, data),
};

export default systemApi;

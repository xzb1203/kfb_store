import service from '@/api/http'

const prefix = '/order/store/order/'
const orderApi = {
  postOrderWithPagingList: (data: object) => service.postParams(`${prefix}/withPagingList`, data),
}

export default orderApi

type tableDataOrderDetailType = {
  detailGoodsCode: string;
  detailGoodsCommodityPrice: number;
  detailGoodsImage: string;
  detailGoodsName: string;
  detailPurchaseQuantity: number;
  detailTotalAmount: number;
};
export type tableDataType = {
  orderAddTimeStr: string;
  orderCode: string;
  orderDetail: tableDataOrderDetailType[];
  orderId: string;
  orderRetiredAmount: number;
  orderReturnId: string;
  orderReturnName: string;
  orderReturnUserName: string;
  orderSaleId: string;
  orderSaleName: string;
  orderStatus: string;
  orderStatusName: string;
  orderTotalAmount: number;
};

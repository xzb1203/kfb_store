type orderDetailType = {
  detailGoodsCode: string;
  detailGoodsCommodityPrice: number;
  detailGoodsImage: string;
  detailGoodsName: string;
  detailId: string;
  detailPurchaseQuantity: number;
  detailTotalAmount: number;
  storeGoodsId: string;
};
export type tableListType = {
  orderAddTimeStr: string;
  orderAmountsPayable: number;
  orderCode: string;
  orderDetail: orderDetailType[];
  orderGoodsType: number;
  orderId: string;
  orderPurchaseId: string;
  orderPurchaseName: string;
  orderSaleAddress: string;
  orderSaleId: string;
  orderSaleName: string;
  orderStatus: string;
  orderStatusName: string;
  orderTotalAmount: number;
  orderUserId: string;
  orderUserName: string;
};

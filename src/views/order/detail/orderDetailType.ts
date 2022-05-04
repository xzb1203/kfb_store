export type orderDetailType = {
  addUserName: string;
  orderContactsPerson: string;
  carEngineCode: string;
  carMileageName: string;
  driverAddress: string;
  driverAvatar: string;
  driverCarId: string;
  driverCarRemark: string;
  driverUserRemark: string;
  goodsSwitch: number;
  orderAddTimeStr: string;
  orderAmountPaid: number;
  orderAmountsPayable: number;
  orderCarCode: string;
  orderCarId: string;
  orderCode: number;
  orderContactsPhone: number;
  orderDiscountAmount: number;
  orderDriverUserCarPlateNumber: string;
  orderDriverUserId: string;
  orderDriverUserName: string;
  orderEstimatedFinishTimeStr: string;
  orderFaultDescription: string;
  orderFaultImage: any[];
  orderId: string;
  orderIncomeExpendLog: any[];
  orderMileage: number;
  orderModelsId: string;
  orderModelsName: string;
  orderModelsNameTwo: string;
  orderNodeStatus: number;
  orderOnePayAmount: number;
  orderPaymentTimeStr: string;
  orderReliefAmount: number;
  orderRemark: string;
  orderReplacementParts: orderReplacementPartsType;
  orderResponsible: [
    {
      orderResponsible: string;
      orderResponsibleName: string;
    },
  ];
  orderServiceItems: orderServiceItemsType;
  orderSettlementTimeStr: string;
  orderStatus: number;
  orderStatusName: string;
  orderTotalAmount: number;
  serviceSwitch: string;
  storeAddress: string;
  storeCityName: string;
  storeContactsPhone: string;
  storeCountyName: string;
  storeId: string;
  storeLatitude: number;
  storeLongitude: number;
  storeName: string;
  storeProvinceName: string;
  userStandbyPhone: number;
};
export type orderReplacementPartsType = {
  detailStageAmount: number;
  detailStageAmountType: string;
  orderDetailId: string;
  orderId: string;
  projectDetails: partsProjectDetailsType[];
};
export type partsProjectDetailsType = {
  goodsInventory: number;
  itemCode: string;
  itemId: string;
  itemImage: string;
  itemName: string;
  itemNumber: number;
  itemStandard: string;
  itemTotalAmount: number;
  itemType: number;
  itemUnit: string;
  itemUnitPrice: number;
  orderDetailId: string;
  orderDetailItemId: string;
  orderGoodsRemark: string;
  userId: string;
  itemRemark: string;
  workHourServices: [
    {
      createTime: number;
      goodsItemId: string;
      id: string;
      orderId: string;
      serviceId: string;
      serviceName: string;
      storeId: string;
      userId: string;
    },
  ];
};
// 服务信息
export type orderServiceItemsType = {
  detailStageAmount: number;
  detailStageAmountType: string;
  orderDetailId: string;
  orderId: string;
  projectDetails: serveProjectDetailsType[];
};
// 服务信息每列
export type serveProjectDetailsType = {
  itemId: string;
  itemName?: string;
  itemNameSuffix?: string;
  itemNumber?: number;
  itemTotalAmount?: number;
  itemUnit?: string;
  itemUnitPrice: number;
  orderDetailId: string;
  orderDetailItemId: string;
  workHour?: number;
  workHourServices: serveWorkHourServicesType[];
};
export type serveWorkHourServicesType = {
  allocationProportion: number;
  createTime?: number;
  goodsItemId: string;
  id: string;
  orderId: string;
  serviceId: string;
  serviceName?: string;
  storeId: string;
  userId: string;
  workHour?: number;
  isEdit?: boolean;
};

export type optionsType = {
  label: string;
  value: string;
};
export type postPersonnelListType = {
  userAddTimeStr: string;
  userAvatar: string;
  userId: string;
  userLoginAccount: string;
  userName: string;
  userPushMoneyPercent: string;
  userRoleName: string;
  userStatus: number;
};

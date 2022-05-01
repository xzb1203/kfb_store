/* WorkHourServices */
export type WorkHourServices = {
  goodsItemId: string;
  serviceName: string;
  userId: string;
  workHour: string;
  allocationProportion: number;
  workHourAll: number;
  userName: string;
  ifEdit: boolean;
};

/* OrderServiceItems */
export type OrderServiceItems = {
  itemId: string;
  itemName: string;
  itemNumber: number;
  workHour: string;
  itemUnitPrice: string;
  workHourServices: WorkHourServices[];
  servicesTotal: number;
  hasPid: boolean;
};

/* OrderServiceUpdateInfo */
export type OrderServiceUpdateInfo = {
  detailStageAmountType: number;
  orderServiceItems: OrderServiceItems[];
  detailStageAmount: number;
};

/* WorkHourServices */
export type partsWorkHourServices = {
  goodsItemId: string;
  serviceName: string;
  userId: string;
};

/* Price */
export type Price = {
  averageInventoryPrice: number;
  historyMaintenanceMaxPrice: number;
  historyMaintenanceMinPrice: number;
  historyPurchaseMaxPrice: number;
  historyPurchaseMinPrice: number;
  historySaleMaxPrice: number;
  historySaleMinPrice: number;
  lastMaintenancePrice: number;
  lastSalePrice: number;
  latestPurchasePrice: number;
  salesPrice: number;
};

/* OrderGoodsItems */
export type OrderGoodsItems = {
  itemId: string;
  itemName: string;
  itemRemark: string;
  itemNumber: number;
  itemTotalAmount: string;
  itemUnitPrice: number;
  orderGoodsCostPrice: number;
  itemCode: string;
  itemImage: string;
  goodsType: string;
  itemUnit: string;
  storeGoodsInventory: number;
  workHourServices: partsWorkHourServices[];
  price: Price;
  userId: string;
};

/* OrderGoodsUpdateInfo */
export type OrderGoodsUpdateInfo = {
  detailStageAmountType: number;
  orderGoodsItems: OrderGoodsItems[];
  detailStageAmount: number;
};

/* tsModel7 */
export type paramsType = {
  afterOrderAmountsPayable: number;
  isCompulsoryPayment: string;
  isSendBack: number;
  isShowOriginalAmount: number;
  orderType: number;
  originalAmount: number;
  storeName: string;
  updateType: number;
  faultDescription: string;
  orderId: string;
  storeId: string;
  remark: string;
  serviceSwitch: number;
  goodsSwitch: number;
  allocationAllState: number;
  orderServiceUpdateInfo: OrderServiceUpdateInfo;
  orderGoodsUpdateInfo: OrderGoodsUpdateInfo;
  carCode: string;
  carMileage: string;
  carModels: string;
  carModelsName: string;
  carPlateNumber: string;
  driverUserId: string;
  driverUserName: string;
  driverUserPhone: string;
  userResponsibleId: string;
  userResponsibleName: string;
  collectMoneyRemark: string;
};
export type tabType = {
  value: number;
  label: string;
};

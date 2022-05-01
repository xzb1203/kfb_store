/* OrderReplacementParts */
export type OrderReplacementParts = {
  detailStageAmount: number;
  detailStageAmountType: number;
  projectDetails: any;
};

/* OrderResponsible */
export type OrderResponsible = {
  orderResponsible: string;
  orderResponsibleName: string;
};

/* OrderServiceItems */
export type OrderServiceItems = {
  detailStageAmount: number;
  detailStageAmountType: number;
  projectDetails: any;
};

/* tsModel3 */
export type orderTableListType = {
  carName: string;
  driverUerCarPlateNumber: string;
  driverUserId: string;
  driverUserName: string;
  orderAddTimeStr: string;
  orderAmountPaid: number;
  orderCarPlateNumber: string;
  orderCode: string;
  orderContactsPhone: string;
  orderEstimatedFinishTimeStr: string;
  orderFaultDescription: string;
  orderId: string;
  orderMileage: string;
  orderModelsName: string;
  orderNodeStatus: string;
  orderReliefAmount: number;
  orderReplacementParts: OrderReplacementParts;
  orderAmountsPayable: string;
  orderResponsible: OrderResponsible[];
  orderServiceItems: OrderServiceItems;
  orderSource: number;
  orderStatus: string;
  orderStatusName: string;
  orderStoreId: string;
  orderVisibility: number;
  vIN: string;
};
export type iconNamesType = {
  [key: string]: string;
};
export type topBarListType = {
  label: string;
  value: string;
  icon: string;
};

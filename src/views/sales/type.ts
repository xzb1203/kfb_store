export type topBarListType = {
  label: string;
  value: string;
  icon: string;
  unit?: string;
};
export type iconNamesType = {
  [key: string]: string;
};
export type optionsType = {
  label: string;
  value: string;
};
export type GroupType = {
  groupId: string;
  groupName: string;
};
export type tableDataType = {
  cumulativeRefundAmount: number;
  driverAddTimeStr: string;
  driverAddress: string;
  driverAvatar: string;
  driverId: string;
  driverLoginTimeStr: string;
  driverName: string;
  driverOrderAddTimeStr: string;
  driverPhone: string;
  driverStatus: number;
  driverTotalCar: string;
  driverTotalOrder: number;
  driverTotalOrderAmount: number;
  driverUnpaidTotalOrderAmount: number;
  driverUserContacts: string;
  driverUserOrderTotalAmountPaid: number;
  driverUserTotalReliefAmount: number;
  remark: string;
  userStandbyPhone: string;
};

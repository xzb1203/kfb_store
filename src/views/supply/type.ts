export type topBarListType = {
  label: string;
  value: string;
  icon: string;
  unit?: string;
};
// 线下供应商
export type offlineTableDataType = {
  addTimeStr: string;
  salesLastTimeStr: string;
  storeId: string;
  supplierCity: number;
  supplierCityName: string;
  supplierContacts: string;
  supplierContactsPhone: string;
  supplierCounty: number;
  supplierCountyName: string;
  supplierDetailedAddress: string;
  supplierId: string;
  supplierName: string;
  supplierProvince: number;
  supplierProvinceName: string;
  totalOrderAmount: number;
  totalOrderBookkeepingAmount: number;
  totalOrderNumber: number;
};
// 三包供应商
export type threeType = {
  arearAmount: number;
  createTime: string;
  cumulativeConsumptionAmount: number;
  cumulativePaymentAmount: number;
  cumulativeRefundAmount: number;
  cumulativeReliefAmount: number;
  id: string;
  mainEnginePlantsAddress: string;
  mainEnginePlantsLinkMan: string;
  mainEnginePlantsName: string;
  mainEnginePlantsPhone: string;
  mainEnginePlantsTotalOrder: number;
  mainEnginePlantsTotalSaleOrder: number;
  storeId: string;
};

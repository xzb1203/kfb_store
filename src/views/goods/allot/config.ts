import { columnsType } from '@/base-ui/tisp-table';

export const defaultConfig: columnsType[] = [
  {
    prop: 'orderCode',
    label: '调拨单号',
  },
  {
    prop: 'goodsGroups',
    label: '商品种数',
  },
  {
    prop: 'goodsFrom',
    label: '出库位置',
  },
  {
    prop: 'goodsTo',
    label: '入库位置',
  },
  {
    prop: 'createBy',
    label: '操作人员',
  },
  {
    prop: 'createTime',
    label: '操作时间',
  },
  {
    prop: 'handle',
    label: '查看详情',
    slotName: 'handle',
  },
];
export const otherConfig: columnsType[] = [
  {
    prop: 'goodsImage',
    label: '图片',
    slotName: 'goodsImage',
  },
  {
    prop: 'goodsName',
    label: '商品名称',
  },
  {
    prop: 'goodsCode',
    label: '商品编号',
  },
  {
    prop: 'storeGoodsSalePrice',
    label: '零售价',
  },
  {
    prop: 'storeGoodsInventory',
    label: '库存',
  },
  {
    prop: 'goodsUnit',
    label: '单位',
  },
  {
    prop: 'goodsUnit',
    label: '单位',
  },
];

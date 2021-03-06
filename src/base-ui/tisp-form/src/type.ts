type IFormType = 'input' | 'password' | 'select' | 'datepicker' | 'text' | 'input-number' | 'slot';
export interface IFormItem {
  field: string;
  type: IFormType;
  label: string;
  rules?: any[];
  placeholder?: any;
  options?: any[];
  otherOptions?: any;
  isHidden?: boolean;
  otherOption?: any;
  style?: any;
}
export interface IForm {
  title?: string;
  formItems: IFormItem[];
  labelWidth?: string;
  colLayout?: any;
  itemLayout?: any;
  itemStyle?: any;
}

import { OnChangeValue } from 'react-select';

export interface Option {
  label: string;
  value: string | number;
  payment_method?: string;
  icon?: JSX.Element | string;
}

export type IsMulti = false | true;

export interface ICustomSelect {
  name: string;
  closeMenuOnSelect?: boolean;
  options: Option[];
  placeholder?: string;
  isMulti: boolean;
  selectedVariant?: string;
  icon?: JSX.Element | string;
  inputClass?: string;
  label?: string;
  labelClass?: string;
  selectedValue?: string;
  Margin?: string;
  Width?: string;
  onChange?: (newValue: OnChangeValue<Option, IsMulti>) => void;
  disabled?: boolean;
  selectLable?: string;
  parentClass?: string;
  className?: string;
  required?: boolean;
  style?:any;
  noOptionsMessage?: string;
  setFieldTouched?: (
    field: string,
    isTouched?: boolean | undefined,
    shouldValidate?: boolean | undefined
  ) => void;
  debounceHandler?: (e: any) => void;
  setScroll?: (value: number | any) => void;
  isLoading?: boolean;
  menuPlacement?: 'top' | 'auto' | 'bottom';
  labelStyle?:any;
  selectId:any;
}

export interface ICustomSelectValue {
  newValue: Option;
}

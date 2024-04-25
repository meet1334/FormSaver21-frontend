import React from 'react';
import Select, {
  IndicatorsContainerProps,
  StylesConfig,
  components,
  MultiValue,
  PropsValue,
  OnChangeValue,
} from 'react-select';
import { ErrorMessage, useField } from 'formik';
import { ICustomSelect, Option } from '../../types/CustomSelect';

type IsMulti = false | true;
interface IRest {
  name: string;
  selectedValue?: string;
  onChange?: (newValue: OnChangeValue<Option, IsMulti>) => void;
}

export const CustomSelect = (props: ICustomSelect) => {
  const {
    inputClass,
    placeholder,
    options,
    selectedVariant,
    icon,
    isMulti = false,
    label,
    labelClass,
    Margin,
    Width,
    disabled,
    selectLable,
    parentClass,
    className,
    setFieldTouched,
    required,
    menuPlacement,
    style,
    closeMenuOnSelect,
    labelStyle,
    selectId,
    ...rest
  } = props;

  const [field, meta, helpers] = useField(rest as unknown as keyof IRest);

  const handleChange = (newValue: OnChangeValue<Option, IsMulti>) => {
    const selectValue = isMulti
      ? (newValue as MultiValue<Option>)?.find((option) => option.value === 'all')
        ? props.options.slice(1).map((op) => op.value)
        : (newValue as MultiValue<Option>)?.map(
            (item: OnChangeValue<Option, IsMulti>) => item && (item as Option).value
          )
      : newValue && (newValue as Option).value;

    helpers.setValue(selectValue);
    props.debounceHandler && props.debounceHandler(selectValue);
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? Array.isArray(field?.value)
          ? options?.filter((option: Option) => field?.value?.indexOf(option.value) >= 0)
          : null
        : options?.find((option: Option) => option?.value === field.value);
    } else {
      return isMulti ? [] : ('' as string);
    }
  };

  type IsMulti = boolean;
  const IndicatorsContainer = (props: IndicatorsContainerProps<Option, IsMulti>) => {
    return (
      <div className="IndicatorsContainerWrap">
        <components.IndicatorsContainer {...props} />
      </div>
    );
  };

  return (
    <div style={style}>
      {selectLable && (
        <label>
          {selectLable}
          {required && <span style={{ color: 'red' }}> * </span>}
        </label>
      )}

      {icon && <span>{icon}</span>}
      <div style={labelStyle}>
        <Select
          id={selectId}
          components={{ IndicatorsContainer }}
          onChange={props.onChange ? props.onChange : handleChange}
          name={rest.name}
          closeMenuOnSelect={closeMenuOnSelect !== undefined ? closeMenuOnSelect : true}
          // styles={

          // }
          noOptionsMessage={
            props.noOptionsMessage
              ? () => {
                  return props.noOptionsMessage;
                }
              : undefined
          }
          value={
            props.selectedValue && options.find((option) => option.value === props.selectedValue)
              ? options.find((option) => option.value === props.selectedValue)
              : getValue()
                ? (getValue() as PropsValue<Option>)
                : null
          }
          placeholder={placeholder}
          options={options}
          onMenuScrollToBottom={props.setScroll}
          isMulti={isMulti ? true : undefined}
          isDisabled={disabled}
          className={className ? className : ''}
          hideSelectedOptions={false}
          // menuIsOpen={true}
          onBlur={() => {
            if (setFieldTouched) setFieldTouched(rest.name, true, true);
          }}
          getOptionLabel={(props: any) => {
            const { icon, label } = props;
            return (
              <div>
                {icon && icon}
                <span>{label}</span>
              </div>
            ) as unknown as string;
          }}
          isLoading={props.isLoading}
          menuPlacement={menuPlacement ? menuPlacement : 'auto'}
        />
      </div>
      {label && (
        <label>
          {label}
          {required && <span style={{ color: 'red' }}>*</span>}
        </label>
      )}
      {/* {meta?.error && <div style={{ marginTop: '10px', color: 'red' }}>{meta?.error}</div>} */}
      <ErrorMessage name={props.name}>
        {(msg) => (
          <div className="fm_error" style={{ color: 'red' }}>
            {typeof msg === 'string' && msg}
          </div>
        )}
      </ErrorMessage>
    </div>
  );
};

export default CustomSelect;

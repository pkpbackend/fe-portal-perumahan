import { Select as AntdSelect, SelectProps } from "antd";
import { useField } from "formik";

export default (props: SelectProps & { name: string }) => {
  const [field, meta, helpers] = useField(props?.name);

  return (
    <AntdSelect
      {...props}
      onChange={(value, option) => {
        helpers.setValue(value);
        props.onChange && props.onChange(value, option);
      }}
      onBlur={(value) => {
        helpers.setTouched(true);
        props.onBlur && props.onBlur(value);
      }}
      value={
        field.value === "" || field.value === null ? undefined : field.value
      }
    />
  );
};

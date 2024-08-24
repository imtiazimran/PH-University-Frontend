import { Form, Select } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  options?: {
    value: string | number;
    label: string | number;
    disabled?: boolean;
  }[] | undefined;
  disabled?: boolean;
  mode?: "multiple" | undefined;
  onValueChange?: (value: string) => void;
};

const SelectWithWatch = ({ label, name, options, disabled, mode, onValueChange }: TPHSelectProps) => {
 const {control} = useFormContext()

 const inputValue = useWatch({
  control,
  name
 })
 useEffect(() => {
     onValueChange && onValueChange(inputValue)
 }, [inputValue, onValueChange])
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
          mode={mode}
            size="large"
            style={{ width: "100%" }}
            {...field}
            options={options}
            disabled={disabled}
          />
          {error && <p style={{ color: "red" }}>{error.message}</p>}
        </Form.Item>
      )}
    />
  );
};

export default SelectWithWatch;

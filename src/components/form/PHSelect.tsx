import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

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
};

const PHSelect = ({ label, name, options, disabled, mode }: TPHSelectProps) => {
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

export default PHSelect;

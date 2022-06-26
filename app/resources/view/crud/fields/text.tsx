import { TextInput } from "@mantine/core";
import type { FC, PropsWithChildren } from "react";

const Text: FC<PropsWithChildren<any>> = ({
  name,
  label,
  placeholder,
  error,
  attributes,
  defaultValue,
}) => {
  return (
    <TextInput
      name={name}
      id={name}
      label={label}
      type="text"
      placeholder={placeholder}
      error={error}
      autoComplete="off"
      defaultValue={defaultValue}
      {...attributes}
    />
  );
};
export default Text;

import { PasswordInput } from "@mantine/core";
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
    <PasswordInput
      name={name}
      id={name}
      label={label}
      placeholder={placeholder}
      error={error}
      autoComplete="off"
      defaultValue={defaultValue}
      {...attributes}
    />
  );
};
export default Text;

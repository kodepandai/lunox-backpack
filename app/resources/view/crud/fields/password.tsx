import { PasswordInput } from "@mantine/core";
import type { FC, PropsWithChildren } from "react";

const Text: FC<PropsWithChildren<any>> = ({
  name,
  label,
  placeholder,
  error,
  attributes,
}) => {
  return (
    <PasswordInput
      name={name}
      id={name}
      label={label}
      placeholder={placeholder}
      error={error}
      autoComplete="new-password"
      {...attributes}
      defaultValue=""
    />
  );
};
export default Text;

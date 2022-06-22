import { PasswordInput } from "@mantine/core";
import type { FC, PropsWithChildren } from "react";

const Text: FC<PropsWithChildren<any>> = ({
  name,
  label,
  placeholder,
  ...attributes
}) => {
  return (
    <PasswordInput
      name={name}
      id={name}
      label={label}
      placeholder={placeholder}
      {...attributes}
    />
  );
};
export default Text;

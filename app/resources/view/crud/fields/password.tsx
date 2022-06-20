import { PasswordInput } from "@mantine/core";
import type { FC, PropsWithChildren } from "react";

const Text: FC<PropsWithChildren<any>> = ({ name, label, placeholder }) => {
  return (
    <PasswordInput
      name={name}
      id={name}
      label={label}
      placeholder={placeholder}
    />
  );
};
export default Text;

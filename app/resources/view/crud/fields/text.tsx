import { TextInput } from "@mantine/core";
import type { FC, PropsWithChildren } from "react";

const Text: FC<PropsWithChildren<any>> = ({
  name,
  label,
  placeholder,
  ...attributes
}) => {
  return (
    <TextInput
      name={name}
      id={name}
      label={label}
      type="text"
      placeholder={placeholder}
      {...attributes}
    />
  );
};
export default Text;

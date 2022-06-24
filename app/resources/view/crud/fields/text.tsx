import { TextInput } from "@mantine/core";
import type { FC, PropsWithChildren } from "react";

const Text: FC<PropsWithChildren<any>> = ({
  name,
  label,
  placeholder,
  error,
  attributes
}) => {
  return (
    <TextInput
      name={name}
      id={name}
      label={label}
      type="text"
      placeholder={placeholder}
      error={error}
      {...attributes}
    />
  );
};
export default Text;

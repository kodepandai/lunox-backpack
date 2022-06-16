import type { FC, PropsWithChildren } from "react";

const Text: FC<PropsWithChildren<never>> = ({ value }) => {
  return <span>{value}</span>;
};
export default Text;

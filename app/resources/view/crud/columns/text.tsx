import type { FC, PropsWithChildren } from "react";

const Text: FC<PropsWithChildren<any>> = ({ value }) => {
  return <span>{value}</span>;
};
export default Text;

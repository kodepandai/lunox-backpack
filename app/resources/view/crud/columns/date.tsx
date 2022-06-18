import type { FC, PropsWithChildren } from "react";
import dayjs from "dayjs";

const Date: FC<PropsWithChildren<any>> = ({ value, column }) => {
  return <span>{dayjs(value).format(column.format || "DD MMM YYYY")}</span>;
};
export default Date;

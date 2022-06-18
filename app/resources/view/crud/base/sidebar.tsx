import {
  Navbar,
  useMantineTheme,
  Badge,
  Text,
  DefaultMantineColor,
} from "@mantine/core";
import type { FC } from "react";

const Sidebar: FC<any> = ({ opened }) => {
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <Menu
        link="/admin/user"
        icon="i-ant-design-team-outlined"
        text="Manage Users"
        color="grape"
      />
      <Menu
        link="/admin/product"
        icon="i-ant-design-dropbox-outlined"
        text="Manage Products"
      />
    </Navbar>
  );
};

const Menu = ({
  link,
  text,
  icon,
  color = "blue",
}: {
  link: string;
  text: string;
  icon: string;
  color?: DefaultMantineColor;
}) => {
  const { colorScheme } = useMantineTheme();
  const dark = colorScheme == "dark";

  return (
    <a
      href={link}
      className={`${
        dark ? "hover:bg-gray-800" : "hover:bg-gray-100"
      } p-2 rounded flex flex-row items-center`}
    >
      <Badge color={color} radius={8} mr={10} p="sm">
        <div className={`${icon} text-lg`} color={color}></div>
      </Badge>
      <Text color={dark ? "dimmed" : "gray"}>{text}</Text>
    </a>
  );
};

export default Sidebar;

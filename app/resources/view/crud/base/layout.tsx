import React, { FC, PropsWithChildren, useState } from "react";
import {
  AppShell,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
  Button,
  Menu,
  Divider,
  Avatar,
} from "@mantine/core";
import Sidebar from "./sidebar";

const CrudLayout: FC<PropsWithChildren<any>> = ({ children, data }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const dark = colorScheme == "dark";
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{ colorScheme }}>
        <AppShell
          styles={{
            root: {
              background: dark ? theme.colors.dark[8] : theme.colors.gray[0],
              color: dark ? theme.colors.gray[0] : theme.colors.dark[8],
            },
          }}
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          fixed
          header={
            <Header height={70} p="md">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  justifyContent: "space-between",
                }}
              >
                <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                  />
                </MediaQuery>

                <Text>{data.appName}</Text>
                <div className="flex flex-row justify-center">
                  <Menu
                    control={
                      <Button variant="subtle" py={0} color="gray">
                        <Avatar radius="xl" size={25} mr={5}></Avatar>
                        {data.user?.fullname}
                      </Button>
                    }
                  >
                    <Menu.Label>Application</Menu.Label>
                    <Menu.Item
                      icon={<div className="i-ant-design-setting-outlined" />}
                    >
                      Settings
                    </Menu.Item>

                    <Divider />

                    <Menu.Label>Profile</Menu.Label>
                    <Menu.Item component="a" href="/logout">
                      Logout
                    </Menu.Item>
                  </Menu>
                  <Button
                    variant="subtle"
                    onClick={() => toggleColorScheme()}
                    color={dark ? "yellow" : "dark"}
                  >
                    <div
                      className={dark ? "i-bi-sun" : "i-bi-moon-stars"}
                    ></div>
                  </Button>
                </div>
              </div>
            </Header>
          }
          navbar={<Sidebar></Sidebar>}
          // aside={}

          footer={
            <Footer height={40} p="xs">
              <small>
                Built with Lunox Backpack v{data.version.app} (lunox v
                {data.version.framework})
              </small>
            </Footer>
          }
        >
          {children}
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default CrudLayout;

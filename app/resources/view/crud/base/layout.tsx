import React, { FC, PropsWithChildren, useLayoutEffect, useState } from "react";
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
import {
  NotificationsProvider,
  showNotification,
} from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import Sidebar from "./sidebar";
import Loader from "./loader";
import { session } from "lunox/client";
import type { LayoutData } from "app/Library/CrudPanel/Traits/Views";

const CrudLayout: FC<PropsWithChildren<{ data: LayoutData }>> = ({
  children,
  data,
}) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const dark = colorScheme == "dark";
  const toggleColorScheme = (value?: ColorScheme) => {
    const newColorScheme = value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(newColorScheme);
    window.localStorage.setItem("mantine:colorScheme", newColorScheme);
  };

  if (!import.meta.env.SSR) {
    useLayoutEffect(() => {
      // get last colorScheme from localStroage
      const savedColorScheme: ColorScheme =
        (window.localStorage.getItem("mantine:colorScheme") as ColorScheme) ||
        "light";
      setColorScheme(savedColorScheme);
    });
  }

  const onLoad = () => {
    if (session("message")) {
      setTimeout(() => {
        showNotification({
          message: session("message"),
          color: session("status") > 400 ? "red" : "green",
        });
      }, 500);
    }
  };
  return (
    <Loader onLoad={onLoad}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider theme={{ colorScheme }}>
          <NotificationsProvider position="top-right" autoClose={3000}>
            <ModalsProvider>
              <AppShell
                styles={{
                  root: {
                    background: dark
                      ? theme.colors.dark[8]
                      : theme.colors.gray[0],
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
                              {data.user?.first_name +
                                " " +
                                data.user?.last_name}
                            </Button>
                          }
                        >
                          <Menu.Label>Application</Menu.Label>
                          <Menu.Item
                            icon={
                              <div className="i-ant-design-setting-outlined" />
                            }
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
                navbar={<Sidebar opened={opened}></Sidebar>}
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
            </ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </Loader>
  );
};

export default CrudLayout;

import {
  Button,
  Center,
  Checkbox,
  Container,
  Paper,
  Text,
  TextInput,
} from "@mantine/core";
import {
  NotificationsProvider,
  showNotification,
} from "@mantine/notifications";
import { csrf_token, old, session } from "lunox/client";
import Loader from "./crud/base/loader";

const Login = ({ version = {} }: { version: any }) => {
  const onLoad = () => {
    // show message from flashed session
    if (session("message")) {
      setTimeout(() => {
        showNotification({
          message: session("message"),
        });
      }, 500);
    }
  };
  return (
    <Loader onLoad={onLoad}>
      <NotificationsProvider position="top-right">
        <Container
          className="h-screen justify-center flex bg-gray-100 px-10 flex-col items-center"
          fluid
        >
          <Center>
            <Paper shadow="md" radius={10} p="xl">
              <form
                action="/login"
                method="post"
                className="flex flex-col max-w-xs w-200 mx-auto"
              >
                <input type="hidden" name="_token" value={csrf_token()} />
                <TextInput
                  type="text"
                  name="username"
                  label="username"
                  placeholder="username or email"
                  defaultValue={old("username")}
                />
                <TextInput
                  type="password"
                  name="password"
                  label="password"
                  placeholder="your password"
                  defaultValue={old("password")}
                />
                <Checkbox label="remember me" name="remember" my="md" />

                <Button type="submit">Login</Button>
              </form>
            </Paper>
          </Center>
          <Text color="dimmed" size="xs" mt={10}>
            lunox backpack v{version.app} - lunox v{version.framework}
          </Text>
        </Container>
      </NotificationsProvider>
    </Loader>
  );
};

export default Login;

import {
  Button,
  Center,
  Checkbox,
  Container,
  Paper,
  Text,
  TextInput,
} from "@mantine/core";
import { csrf_token, old, session } from "lunox/client";
import { useEffect } from "react";

const Login = ({ version = {} }: { version: any }) => {
  useEffect(() => {
    // show message from flashed session
    if (session("message")) {
      alert(session("message"));
    }
  });
  return (
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
  );
};

export default Login;

import { Button, Center, Checkbox, Container, Paper, TextInput } from "@mantine/core";
import { csrf_token, old, session } from "lunox/client";
import { useEffect } from "react";

const Login = ({ version = {} }) => {
  useEffect(() => {
    // show message from flashed session
    if (session("message")) {
      alert(session("message"));
    }
  });
  return (
    <Container className="h-screen justify-center flex bg-gray-100 px-10" fluid>
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
            <Checkbox label="remember me" name="remember" color="orange" my="md"/>

            <Button type="submit">Login</Button>
          </form>
        </Paper>
      </Center>
    </Container>
  );
};

export default Login;

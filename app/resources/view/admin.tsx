import { Paper } from "@mantine/core";
import type User from "app/Model/User";
import type { OnServer } from "lunox";
import CrudLayout from "./crud/base/layout";

export const onServer: OnServer = async (req) => {
  return {
    user: await req.auth().user(),
    appName: config("app.name"),
    version: app("version"),
  };
};

const Admin = ({
  version,
  user,
  appName,
}: {
  version: any;
  user: User;
  appName: string;
}) => {
  return (
    <CrudLayout
      data={{
        title: "Dashboard",
        user,
        appName,
        version,
      }}
    >
      <Paper shadow="md" p={10}>
        Welcome {user?.fullname}
      </Paper>
    </CrudLayout>
  );
};

export default Admin;

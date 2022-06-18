import { Paper } from "@mantine/core";
import type { CrudContext } from "app/Http/Controllers/CrudController";
import type User from "app/Model/User";
import type { ObjectOf, OnServer } from "lunox";
import CrudLayout from "./crud/base/layout";

export const onServer: OnServer = async (req, ctx: CrudContext) => {
  return {
    user: await req.auth().user(),
    layoutData: {
      appName: config("app.name"),
      title: ctx.title,
      version: app("version"),
      user: await req.auth().user(),
    },
  };
};

const Admin = ({
  user,
  layoutData = {},
}: {
  version: ObjectOf<string>;
  user: User;
  layoutData: ObjectOf<any>;
}) => {
  return (
    <CrudLayout data={layoutData}>
      <Paper shadow="md" p={10}>
        Welcome {user?.fullname}
      </Paper>
    </CrudLayout>
  );
};

export default Admin;

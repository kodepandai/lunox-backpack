import type { CrudContext } from "app/Http/Controllers/CrudController";
import type { Column } from "app/Library/CrudPanel/Traits/Columns";
import type { Model, OnServer } from "lunox";
import { Paper, Title } from "@mantine/core";
import CrudLayout from "./base/layout";
import type { LayoutData } from "app/Library/CrudPanel/CrudPanel";

export const onServer: OnServer = async (req, ctx: CrudContext) => {
  const model = ctx.crud.getModel();

  return {
    entries: await model.query(),
    layoutData: await ctx.crud.getLayoutData(),
  };
};

export default ({
  layoutData,
}: {
  entries: Model[];
  version: any;
  columns: Column[];
  components: any;
  layoutData: LayoutData;
}) => {
  return (
    <CrudLayout data={layoutData}>
      <Title order={1} className="mb-3">
        Create {layoutData.entity?.name.singular}
      </Title>
      <Paper shadow="xs" p="xs">
        TODO: complete me
      </Paper>
    </CrudLayout>
  );
};

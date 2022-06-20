import type { CrudContext } from "app/Http/Controllers/CrudController";
import type { Column } from "app/Library/CrudPanel/Traits/Columns";
import type { Model, OnServer } from "lunox";
import * as components from "./columns/index";
import { Button, Paper, ScrollArea, Table, Title } from "@mantine/core";
import CrudLayout from "./base/layout";
import type { LayoutData } from "app/Library/CrudPanel/CrudPanel";

export const onServer: OnServer = async (req, ctx: CrudContext) => {
  const model = ctx.crud.getModel();
  const columns = ctx.crud.columns();

  return {
    entries: await model.query(),
    columns,
    layoutData: await ctx.crud.getLayoutData(),
  };
};

export default ({
  entries,
  columns,
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
        {layoutData.title}
      </Title>
      <Button className="mb-3" component="a" href={layoutData.route+"/create"}>Add {layoutData.entity?.name.singular}</Button>
      <Paper shadow="xs" p="xs">
        <ScrollArea>
          <Table striped highlightOnHover>
            <thead>
              <tr className="text-left">
                <th>No</th>
                {columns.map((column) => (
                  <th key={column.name}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, ei) => {
                return (
                  <tr key={entry.id}>
                    <td>{ei + 1}</td>
                    {columns.map((column, ci) => {
                      const ColumnComponent = (components as any)[
                        column.type as any
                      ].default;
                      return ColumnComponent ? (
                        <td key={ci}>
                          <ColumnComponent
                            value={entry[column.name as "id"]?.toString()}
                            column={column}
                          />
                        </td>
                      ) : (
                        <td key={ci}></td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </ScrollArea>
      </Paper>
    </CrudLayout>
  );
};

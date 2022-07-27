import type { CrudContext } from "app/Http/Controllers/CrudController";
import type { Column } from "app/Library/CrudPanel/Traits/Columns";
import type { OnServer } from "lunox";
import * as components from "./columns/index";
import {
  Anchor,
  Breadcrumbs,
  Button,
  Paper,
  ScrollArea,
  Table,
  Title,
} from "@mantine/core";
import CrudLayout from "./base/layout";
import { useEffect, useState } from "react";
import Axios from "axios";
import type { LayoutData } from "app/Library/CrudPanel/Traits/Views";

export const onServer: OnServer = async (req, ctx: CrudContext) => {
  const columns = ctx.crud.columns();

  return {
    columns,
    layoutData: await ctx.crud.getLayoutData(),
  };
};

export default ({
  columns,
  layoutData,
}: {
  columns: Column[];
  layoutData: LayoutData;
}) => {
  const [entry, setEntry] = useState<any>({});
  useEffect(() => {
    Axios.get(`${layoutData.route}/${layoutData.entity?.id}/detail`).then(
      (res) => {
        setEntry(res.data);
      }
    );
  }, []);

  return (
    <CrudLayout data={layoutData}>
      <Breadcrumbs className="mb-4">
        <Anchor href="/admin">Dashboard</Anchor>
        <Anchor href={layoutData.route}>
          List {layoutData.entity?.name.plural}
        </Anchor>
      </Breadcrumbs>
      <Title order={1} className="mb-3">
        {layoutData.title} <small className="text-sm">Detail</small>
      </Title>
      <Paper shadow="xs" p="xs">
        <ScrollArea>
          <Table>
            <tbody>
              {columns.map((column, ci) => {
                const ColumnComponent = (components as any)[column.type as any]
                  .default;

                return (
                  <tr key={ci}>
                    <td className="font-bold">{column.label}</td>
                    <td>
                      <ColumnComponent
                        value={entry[column.name]?.toString()}
                        column={column}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </ScrollArea>
      </Paper>
      <Paper shadow="xs" p="xs" className="text-center" mt="sm">
        <Button
          compact
          className="mr-3"
          color="gray"
          component="a"
          href={`${layoutData.route}/${entry.id}/edit`}
        >
          Edit
        </Button>
      </Paper>
    </CrudLayout>
  );
};

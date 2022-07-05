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
import ButtonDelete from "./buttons/delete";
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
  const [entries, setEntries] = useState<any[]>([]);

  useEffect(() => {
    Axios.get(`${layoutData.route}/search`).then((res) => {
      console.log(res);
      setEntries(res.data);
    });
  }, []);

  const deleteEntry = (id: number) => {
    setEntries((prev) => prev.filter((x) => x.id != id));
  };
  return (
    <CrudLayout data={layoutData}>
      <Breadcrumbs className="mb-4">
        <Anchor href="/admin">Dashboard</Anchor>
      </Breadcrumbs>
      <Title order={1} className="mb-3">
        {layoutData.title} <small className="text-sm">List</small>
      </Title>
      <Button
        className="mb-3"
        component="a"
        href={layoutData.route + "/create"}
      >
        Add {layoutData.entity?.name.singular}
      </Button>
      <Paper shadow="xs" p="xs">
        <ScrollArea>
          <Table striped highlightOnHover>
            <thead>
              <tr className="text-left">
                <th>No</th>
                {columns.map((column) => (
                  <th key={column.name}>{column.label}</th>
                ))}
                <th>Actions</th>
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
                    <td>
                      <ButtonDelete
                        entityName={layoutData.entity?.name.singular}
                        id={entry.id}
                        route={layoutData.route}
                        onDelete={deleteEntry}
                      ></ButtonDelete>
                      <Button size="xs" compact className="ml-3" color="gray" component="a" href={`${layoutData.route}/${entry.id}/show`}>
                        Show
                      </Button>
                    </td>
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

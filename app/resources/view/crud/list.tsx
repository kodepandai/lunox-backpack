import type { CrudContext } from "app/Http/Controllers/CrudController";
import Layout from "../../components/Layout";
import type { Column } from "app/Library/CrudPanel/Traits/Columns";
import type { Model, OnServer } from "lunox";
import * as components from "./columns/index";

export const onServer: OnServer = async (req, ctx: CrudContext) => {
  const model = ctx.crud.getModel();
  const columns = ctx.crud.columns();

  return {
    entries: await model.query(),
    version: app("version"),
    columns,
  };
};

export default ({
  entries,
  version = {},
  columns,
}: {
  entries: Model[];
  version: any;
  columns: Column[];
  components: any;
}) => {
  return (
    <Layout version={version}>
      <table>
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
      </table>
    </Layout>
  );
};

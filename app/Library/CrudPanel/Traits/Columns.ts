import { Class, Str, Trait } from "lunox";
import type CrudPanel from "../CrudPanel";
import type { BaseCrudPanel } from "../CrudPanel";
import type { ISettings } from "./Settings";

export interface Column {
  name: string;
  label?: string;
  type?: string;
  [key: string]: any;
}
export interface IColumns {
  /**
   * Get all columns in this current operation setting;
   */
  columns(): Column[];
  /**
   * Add column to current operation setting;
   */
  addColumn(column: Column): CrudPanel;
}
const Columns: Trait<typeof BaseCrudPanel & Class<ISettings>> = (s) =>
  class extends s {
    public addColumn(column: Column) {
      return this.addColumnToOperationSettings(column);
    }

    public columns() {
      return this.getOperationSetting<Column[]>("columns") || [];
    }

    protected addColumnToOperationSettings(column: Column) {
      column = this.makeSureColumnHasNeededAttributes(column);
      const columns = this.columns();
      columns.push(column);
      this.setOperationSetting("columns", columns);
    }

    protected makeSureColumnHasNeededAttributes(column: Column) {
      if (!column.label) {
        column.label = Str.ucfirst(column.name).replace(/_/g, " ");
      }
      if (!column.type) {
        column.type = "text";
      }
      return column;
    }
  };

export default Columns;

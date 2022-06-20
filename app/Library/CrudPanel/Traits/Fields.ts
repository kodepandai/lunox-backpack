import { Class, Str, Trait } from "lunox";
import type CrudPanel from "../CrudPanel";
import type { BaseCrudPanel } from "../CrudPanel";
import type { ISettings } from "./Settings";

export interface Field {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  grid?: number;
  break?: boolean;
  [key: string]: any;
}
export interface IFields {
  /**
   * Get all fields in this current operation setting;
   */
  fields(): Field[];
  /**
   * Add field to current operation setting;
   */
  addField(field: Field): CrudPanel;
}
const Fields: Trait<typeof BaseCrudPanel & Class<ISettings>> = (s) =>
  class extends s {
    public addField(field: Field) {
      return this.addFieldToOperationSettings(field);
    }

    public fields() {
      return this.getOperationSetting<Field[]>("fields") || [];
    }

    protected addFieldToOperationSettings(field: Field) {
      field = this.makeSureFieldHasNeededAttributes(field);
      const fields = this.fields();
      fields.push(field);
      this.setOperationSetting("fields", fields);
    }

    protected makeSureFieldHasNeededAttributes(field: Field) {
      if (!field.label) {
        field.label = Str.ucfirst(field.name);
      }
      if (!field.type) {
        field.type = "text";
      }
      if (!field.placeholder) {
        field.placeholder = field.label;
      }
      return field;
    }
  };

export default Fields;

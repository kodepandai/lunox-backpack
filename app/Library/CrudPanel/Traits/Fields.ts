import { Class, ObjectOf, Str, Trait } from "lunox";
import type CrudPanel from "../CrudPanel";
import type { BaseCrudPanel } from "../CrudPanel";
import type { ISettings } from "./Settings";
import type { IValidation } from "./Validation";

export interface Field {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  grid?: number;
  break?: boolean;
  attributes?: {
    required?: boolean;
  };
  value?: any;
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

  /**
   * Get all field names for the current operation.
   */
  getAllFieldNames(): string[];

  /**
   * Return only registered field names.
   */
  getStrippedSaveRequest(): ObjectOf<any>;
}
const Fields: Trait<
  typeof BaseCrudPanel & Class<ISettings> & Class<IValidation>
> = (s) =>
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

      if (!field.attributes) field.attributes = {};
      if (typeof field.attributes.required == "undefined") {
        field.attributes.required = this.isRequired(field.name);
      }
      return field;
    }

    public getAllFieldNames() {
      return this.fields().map((f) => f.name);
    }

    public getStrippedSaveRequest() {
      return this.getRequest().only(this.getAllFieldNames());
    }
  };

export default Fields;

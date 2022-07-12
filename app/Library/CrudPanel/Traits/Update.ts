import type { Class, ObjectOf, Trait } from "lunox";
import type { ExtendedModel } from "lunox/dist/Database/Eloquent/Model";
import type { BaseCrudPanel } from "../CrudPanel";
import type { ISettings } from "./Settings";
import type { Field, IFields } from "./Fields";
import type { IRead } from "./Read";

export interface IUpdate {
  /**
   * update row to database.
   */
  update(id: number, data: ObjectOf<any>): Promise<ExtendedModel>;

  /**
   * get all fields needed for UpdateOperation.
   */
  getUpdateFields(id: number): Promise<Field[]>;
}
const Update: Trait<
  typeof BaseCrudPanel & Class<ISettings & IRead & IFields>
> = (s) =>
  class extends s {
    public async update(id: number, data: ObjectOf<any>) {
      // TODO: how to insert relational data??
      const item = await this.model.query().updateAndFetchById(id, data);
      return item;
    }

    public async getUpdateFields(id: number) {
      let fields = this.fields();
      const entry = await this.getEntry(id);
      fields = fields.map((field) => {
        if (typeof field.value == "undefined") {
          // TODO how to get relational data?
          field.value = entry?.[field.name];
        }
        return field;
      });
      return fields;
    }
  };

export default Update;

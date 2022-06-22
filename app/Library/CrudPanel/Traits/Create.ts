import type { Class, ObjectOf, Trait } from "lunox";
import type { ExtendedModel } from "lunox/dist/Database/Eloquent/Model";
import type { BaseCrudPanel } from "../CrudPanel";
import type { ISettings } from "./Settings";


export interface ICreate {
  /**
   * Insert row to database.
   */
  create(data: ObjectOf<any>): Promise<ExtendedModel>
}
const Create: Trait<typeof BaseCrudPanel & Class<ISettings>> = (s) =>
  class extends s {
    public async create(data: ObjectOf<any>){
      // TODO: how to insert relational data??
      const item = await this.model.query().insert(data);
      return item;
    }
  };

export default Create;

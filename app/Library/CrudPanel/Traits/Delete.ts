import { Class, NotFoundHttpException, Trait } from "lunox";
import type { BaseCrudPanel } from "../CrudPanel";
import type { ISettings } from "./Settings";

export interface IDelete {
  /**
   * Delete row from database.
   */
  delete(id: number): Promise<void>;
}
const Delete: Trait<typeof BaseCrudPanel & Class<ISettings>> = (s) =>
  class extends s {
    public async delete(id: number) {
      const deleted = await this.model.query().deleteById(id);
      if (!deleted) {
        throw new NotFoundHttpException();
      }
    }
  };

export default Delete;

import type { CrudTrait } from "app/Model/Traits/CrudTrait";
import { Model, Traitable } from "lunox";
import type { ExtendedModel } from "lunox/dist/Database/Eloquent/Model";
import type { Request } from "lunox/dist/Http/Request";
import Operations, { IOperations } from "./Traits/Operations";
import Settings, { ISettings } from "./Traits/Settings";
import Columns, { IColumns } from "./Traits/Columns";
import Views, { IViews } from "./Traits/Views";

export class BaseCrudPanel {
  protected model!: typeof Model & CrudTrait; // entity's model
  protected route!: string; // route for entity, used for links
  protected entity_name = "entry";
  protected entity_name_plural = "entries";

  protected entry!: any;
  protected request!: Request;

  public setRequest(req: Request) {
    this.request = req;
  }

  public setEntityNameStrings(singular: string, plural: string) {
    this.entity_name = singular;
    this.entity_name_plural = plural;
  }

  /**
   * bind the crud to its corresponding model
   */
  public setModel(model: any) {
    // TODO: typescript will throw error when model type is set to typeof Model
    // see https://github.com/Vincit/objection.js/issues/2178
    if (!(model?.hasCrudTrait instanceof Function && model.hasCrudTrait())) {
      throw new Error("please use CrudTrait on the model");
    }
    this.model = model;
  }

  public getModel<T = typeof ExtendedModel>() {
    return this.model as unknown as T & CrudTrait;
  }
}
interface CrudPanel extends ISettings, IViews, IOperations, IColumns {}
class CrudPanel extends Traitable(BaseCrudPanel).use(
  Columns,
  Views,
  Settings,
  Operations
) {}

export default CrudPanel;

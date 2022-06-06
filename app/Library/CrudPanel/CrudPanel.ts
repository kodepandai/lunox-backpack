import type { CrudTrait } from "app/Model/Traits/CrudTrait";
import { Model, Traitable } from "lunox";
import type { Request } from "lunox/dist/Http/Request";
import Settings, { Settings as ISettings } from "./Traits/Settings";
import Views, { Views as IViews } from "./Traits/Views";

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
}
interface CrudPanel extends ISettings, IViews {}
class CrudPanel extends Traitable(BaseCrudPanel).use(Views, Settings) {}

export default CrudPanel;

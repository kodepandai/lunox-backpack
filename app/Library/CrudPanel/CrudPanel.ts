import type { CrudTrait } from "app/Model/Traits/CrudTrait";
import { Traitable } from "lunox";
import type { ExtendedModel } from "lunox/dist/Database/Eloquent/Model";
import type { Request } from "lunox/dist/Http/Request";
import Operations, { IOperations } from "./Traits/Operations";
import Settings, { ISettings } from "./Traits/Settings";
import Columns, { IColumns } from "./Traits/Columns";
import Views, { IViews } from "./Traits/Views";
import Fields, { IFields } from "./Traits/Fields";
import Validation, { IValidation } from "./Traits/Validation";
import Create, { ICreate } from "./Traits/Create";
import Access, { IAccess } from "./Traits/Access";
import SaveActions, { ISaveActions } from "./Traits/SaveActions";
import Delete, { IDelete } from "./Traits/Delete";
import Read, { IRead } from "./Traits/Read";

export class BaseCrudPanel {
  protected model!: typeof ExtendedModel & CrudTrait; // entity's model
  protected route!: string; // route for entity, used for links
  public entity_name = "entry";
  public entity_name_plural = "entries";

  protected entry!: any;
  protected request!: Request;

  /**
   * Set Http Request instance.
   */
  public setRequest(req: Request) {
    this.request = req;
  }

  /**
   * Get Http Reqyest instance;
   */
  public getRequest() {
    return this.request;
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
    this.entry = null;
  }

  public getModel<T = typeof ExtendedModel>() {
    return this.model as unknown as T & CrudTrait;
  }

  /**
   * Set the route for this CRUD.
   * Ex: admin/article.
   */
  public setRoute(route: string) {
    this.route = route;
  }

  /**
   * Get current route for this CRUD
   */
  public getRoute() {
    return (
      this.route ||
      this.request.getRouter().prefix + this.request.getRouter().segment ||
      ""
    );
  }

}
interface CrudPanel
  extends ISettings,
    IViews,
    IOperations,
    IColumns,
    IDelete,
    IFields,
    IValidation,
    ICreate,
    IAccess,
    IRead,
    ISaveActions {}
class CrudPanel extends Traitable(BaseCrudPanel).use(
  Access,
  Columns,
  Create,
  Delete,
  Fields,
  Views,
  SaveActions,
  Settings,
  Operations,
  Read,
  Validation
) {}

export default CrudPanel;

import type { CrudTrait } from "app/Model/Traits/CrudTrait";
import { Model, ObjectOf, Traitable } from "lunox";
import type { ExtendedModel } from "lunox/dist/Database/Eloquent/Model";
import type { Request } from "lunox/dist/Http/Request";
import Operations, { IOperations } from "./Traits/Operations";
import Settings, { ISettings } from "./Traits/Settings";
import Columns, { IColumns } from "./Traits/Columns";
import Views, { IViews } from "./Traits/Views";
import type { Authenticatable } from "lunox/dist/Contracts/Auth/Authenticatable";

export interface LayoutData {
  appName: string;
  title: string;
  route?: string;
  entity?: {
    name: {
      singular: string;
      plural: string;
    };
  };
  version: {
    framework: string;
    app: string;
  };
  user?: Authenticatable & ObjectOf<any>;
}
export class BaseCrudPanel {
  protected model!: typeof Model & CrudTrait; // entity's model
  protected route!: string; // route for entity, used for links
  public entity_name = "entry";
  public entity_name_plural = "entries";

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

  /**
   * get data to be injected on crud layout view
   */
  public async getLayoutData(): Promise<LayoutData> {
    return {
      appName: config("app.name"),
      title: this.entity_name_plural,
      route: this.getRoute(),
      entity: {
        name: {
          singular: this.entity_name,
          plural: this.entity_name_plural,
        },
      }, //TODO: update me
      version: app<any>("version"),
      user: await this.request.auth().user(),
    };
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

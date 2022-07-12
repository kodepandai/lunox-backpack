import type { Class, ObjectOf, Trait } from "lunox";
import type { ISettings } from "app/Library/CrudPanel/Traits/Settings";
import type { BaseCrudPanel } from "../CrudPanel";
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
    id?: number;
  };
  version: {
    framework: string;
    app: string;
  };
  user?: Authenticatable & ObjectOf<any>;
}
export interface IViews {
  setListView(view: string): void;
  getListView(): string;

  setCreateView(view: string): void;
  getCreateView(): string;

  setUpdateView(view: string): void;
  getUpdateView(): string;

  setShowView(view: string): void;
  getShowView(): string;
  /**
   * get data to be injected on crud layout view
   */
  getLayoutData(): Promise<LayoutData>;
}
const Views: Trait<typeof BaseCrudPanel & Class<ISettings>> = (s) =>
  class extends s {
    public setListView(view: string) {
      this.set("list.view", view);
    }

    public getListView() {
      return this.get("list.view") || "crud.list";
    }

    public setCreateView(view: string) {
      this.set("create.view", view);
    }

    public getCreateView() {
      return this.get("create.view") || "crud.create";
    }

    public getShowView() {
      return this.get("show.view") || "crud.show";
    }

    public setShowView() {
      this.set("show.view", view);
    }

    public setUpdateView(view: string) {
      return this.set("update.view", view);
    }

    public getUpdateView() {
      return this.get("update.view") || "crud.edit";
    }

    public async getLayoutData(): Promise<LayoutData> {
      return {
        appName: config("app.name"),
        title: this.get("title") || this.entity_name_plural,
        route: this.getRoute(),
        entity: {
          name: {
            singular: this.entity_name,
            plural: this.entity_name_plural,
          },
          id: this.get("id"),
        }, //TODO: update me
        version: app<any>("version"),
        user: await this.request.auth().user(),
      };
    }
  };

export default Views;

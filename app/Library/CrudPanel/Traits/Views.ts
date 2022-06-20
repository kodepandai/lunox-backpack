import type { Class, Trait } from "lunox";
import type { ISettings } from "app/Library/CrudPanel/Traits/Settings";
import type { BaseCrudPanel } from "../CrudPanel";

export interface IViews {
  setListView(view: string): void;
  getListView(): string;

  setCreateView(view: string): void;
  getCreateView(): string;
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
  };

export default Views;

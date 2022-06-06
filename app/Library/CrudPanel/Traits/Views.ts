import type { Class, Trait } from "lunox";
import type { Settings } from "app/Library/CrudPanel/Traits/Settings";
import type { BaseCrudPanel } from "../CrudPanel";

export interface Views {
  setListView(view: string): void;
  getListView(): string;
}
const Views: Trait<typeof BaseCrudPanel & Class<Settings>> = (s) =>
  class extends s {
    public setListView(view: string) {
      this.set("list.view", view);
    }

    public getListView() {
      return this.get("list.view") || "crud.list";
    }
  };

export default Views;

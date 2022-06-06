import type { ObjectOf, Trait } from "lunox";
import type { BaseCrudPanel } from "../CrudPanel";

export interface Settings {
  set(key: string, value: string): void;
  get(key: string): string | undefined;
}
const Settings: Trait<typeof BaseCrudPanel> = (s) =>
  class extends s {
    protected settings: ObjectOf<string | undefined> = {};

    public set(key: string, value: string) {
      this.settings[key] = value;
    }

    public get(key: string) {
      return this.settings[key];
    }
  };

export default Settings;

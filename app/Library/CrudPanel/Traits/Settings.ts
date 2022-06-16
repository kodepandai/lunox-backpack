import type { Class, ObjectOf, Trait } from "lunox";
import type { BaseCrudPanel } from "../CrudPanel";
import type { IOperations } from "./Operations";

export interface ISettings {
  set(key: string, value: any): any;
  get<T = any>(key: string): T;
  setOperationSetting(key: string, value: any, operation?: string): any;
  getOperationSetting<T = any>(key: string, operation?: string): T;

  /**
   * Automatically set values in config file (config/backpack/crud)
   * as settings values for that operation.
   */
  loadDefaultOperationSettingsFromConfig(configPath?: string): void;
}

const Settings: Trait<typeof BaseCrudPanel & Class<IOperations>> = (s) =>
  class extends s {
    protected settings: ObjectOf<any> = {};

    public set(key: string, value: any) {
      return (this.settings[key] = value);
    }

    public get(key: string) {
      return this.settings[key];
    }

    /**
     * Setter for the settings key-value store for a certain operation.
     * Defaults to the current operation.
     */
    public setOperationSetting(key: string, value: any, operation?: string) {
      operation = operation || this.getCurrentOperation();
      return this.set(operation + "." + key, value);
    }

    /**
     * Getter for the settings key-value store on a certain operation.
     * Defaults to the current operation.
     */
    public getOperationSetting(key: string, operation?: string) {
      operation = operation || this.getCurrentOperation();
      return (
        this.get(operation + "." + key) ||
        config(`backpack.crud.operations.${operation}.${key}`, null)
      );
    }

    public loadDefaultOperationSettingsFromConfig(configPath?: string) {
      const operation = this.getCurrentOperation();
      configPath = configPath || "backpack.crud.operations." + operation;
      const configSettings = config(configPath, {} as ObjectOf<any>);
      if (typeof configSettings == "object") {
        Object.keys(configSettings).forEach((key) => {
          this.setOperationSetting(key, configSettings[key]);
        });
      }
    }
  };

export default Settings;

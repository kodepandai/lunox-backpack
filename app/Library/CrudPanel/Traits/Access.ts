import { Arr, Class, Trait } from "lunox";
import type { BaseCrudPanel } from "../CrudPanel";
import type { ISettings } from "./Settings";

export interface IAccess {
  /**
   * Set operation as having access.
   */
  allowAccess(operation: string|string[]): void

  /**
   * Check if CRUD allowed todo operation.
   */
  hasAccess(operation: string): boolean;
}
const Access: Trait<typeof BaseCrudPanel & Class<ISettings>> = (s) =>
  class extends s {
    public allowAccess(operation: string|string[]){
      operation = Arr.wrap(operation);
      operation.forEach(op=>{
        this.set(op+".access", true);
      });
    }

    public hasAccess(operation: string){
      return this.get<boolean>(operation+".access") || false;
    }
  };

export default Access;

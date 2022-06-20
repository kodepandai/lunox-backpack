import { Arr, CallBack, Class, Trait } from "lunox";
import type { BaseCrudPanel } from "../CrudPanel";
import type { ISettings } from "../Traits/Settings";

export interface IOperations {
  /**
   * Set current CRUD operation
   */
  setCurrentOperation(operationName: string): void;

  /**
   * Get current CRUD operation
   */
  getCurrentOperation(): string;

  /**
   * Run the closures that have been specified for each operation, as configurations.
   * This is called when an operation does setCurrentOperation().
   */
  applyConfigurationFromSettings(operationName: string): void;

  /**
   * Store a closure which configures a certain operation inside settings.
   * All configurations are put inside that operation's namespace.
   * Ex: show.configuration.
   */
  configureOperation(operations: string | string[], closure?: CallBack): void;
}
const Operations: Trait<typeof BaseCrudPanel & Class<ISettings>> = (s) =>
  class extends s {
    protected currentOperation = "";

    /**
     * Set the current CRUD operation being performed.
     */
    public setCurrentOperation(operationName: string) {
      this.currentOperation = operationName;
    }

    /**
     * Get the current CRUD operation being performed.
     */
    public getCurrentOperation() {
      return this.currentOperation || this.request.getRouter().operation || "";
    }

    public applyConfigurationFromSettings(operations: string | string[]) {
      operations = Arr.wrap(operations);
      operations.forEach((operation) => {
        const configuration = this.get<(CallBack | undefined)[]>(
          operation + ".configuration"
        );
        configuration?.forEach((configuration) => {
          if (typeof configuration == "function") {
            // apply the closure
            configuration();
          }
        });
      });
    }

    public configureOperation(
      operations: string | string[],
      closure?: CallBack
    ) {
      operations = Arr.wrap(operations);
      operations.forEach((operation) => {
        const configuration =
          this.get<(CallBack | undefined)[]>(operation + ".configuration") ||
          [];
        configuration.push(closure);
        this.set(operation + ".configuration", configuration);
      });
    }
  };

export default Operations;

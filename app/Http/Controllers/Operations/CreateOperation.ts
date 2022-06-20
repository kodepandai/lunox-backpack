import { Route, Trait } from "lunox";
import type CrudController from "app/Http/Controllers/CrudController";

export interface CreateOperation {
  create(): void;
}
const CreateOperation: Trait<typeof CrudController> = (s) =>
  class extends s {
    protected setupCreateRoutes(
      segment: string,
      controller: typeof CrudController
    ) {
      Route.get(segment + "/create", [controller, "create"], {
        operation: "create",
        segment,
      });
    }

    /**
     * Add the default settings, buttons, etc that this operation needs.
     */
    protected setupCreateDefaults() {
      this.crud.configureOperation("create", () => {
        this.crud.loadDefaultOperationSettingsFromConfig();
      });
      //  TODO: complete me
    }

    public create() {
      this.data.crud = this.crud;

      // this.data should be sent via view context
      // so can be accessed via onServer method on view
      return view(this.crud.getCreateView()).withContext(this.data);
    }
  };

export default CreateOperation;

import { Route, Trait } from "lunox";
import type CrudController from "app/Http/Controllers/CrudController";

export interface CreateOperation {
  create(): any;
  store(): any;
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

      Route.post(segment, [controller, "store"], {
        operation: "create",
        segment,
      });
    }

    /**
     * Add the default settings, buttons, etc that this operation needs.
     */
    protected setupCreateDefaults() {
      this.crud.allowAccess("create");

      this.crud.configureOperation("create", () => {
        this.crud.loadDefaultOperationSettingsFromConfig();
        this.crud.setupDefaultSaveActions();
      });
      //  TODO: complete me
    }

    public create() {
      this.crud.hasAccessOrFail("create");

      this.data.crud = this.crud;

      // this.data should be sent via view context
      // so can be accessed via onServer method on view
      return view(this.crud.getCreateView()).withContext(this.data);
    }

    public async store() {
      this.crud.hasAccessOrFail("create");
      // validate the Form Request validation
      await this.crud.validateRequest();

      // insert items to db
      await this.crud.create(this.crud.getStrippedSaveRequest());

      this.crud.setSaveAction();

      return this.crud.performSaveAction();
    }
  };

export default CreateOperation;

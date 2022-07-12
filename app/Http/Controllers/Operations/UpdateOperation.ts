import { Route, Trait } from "lunox";
import type CrudController from "app/Http/Controllers/CrudController";
import type { Request } from "lunox/dist/Http/Request";

export interface UpdateOperation {
  update(req: Request, id: number): any;
  edit(req: Request, id: number): any;
}
const UpdateOperation: Trait<typeof CrudController> = (s) =>
  class extends s {
    protected setupUpdateRoutes(
      segment: string,
      controller: typeof CrudController
    ) {
      Route.get(segment + "/:id/edit", [controller, "edit"], {
        operation: "update",
        segment,
      });

      Route.put(segment + "/id", [controller, "update"], {
        operation: "update",
        segment,
      });
    }

    /**
     * Add the default settings, buttons, etc that this operation needs.
     */
    protected setupUpdateDefaults() {
      this.crud.allowAccess("update");

      this.crud.configureOperation("update", () => {
        this.crud.loadDefaultOperationSettingsFromConfig();
        this.crud.setupDefaultSaveActions();
      });
      //  TODO: complete me
    }

    public async edit(req: Request, id: number) {
      this.crud.hasAccessOrFail("update");

      this.crud.setOperationSetting(
        "fields",
        await this.crud.getUpdateFields(id)
      );

      this.data.crud = this.crud;

      // this.data should be sent via view context
      // so can be accessed via onServer method on view
      return view(this.crud.getUpdateView()).withContext(this.data);
    }

    public async update(req: Request, id: number) {
      this.crud.hasAccessOrFail("update");

      // validate the Form Request validation
      await this.crud.validateRequest();

      // insert items to db
      // await this.crud
    }
  };

export default UpdateOperation;

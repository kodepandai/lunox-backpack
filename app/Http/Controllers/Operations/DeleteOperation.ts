import { Route, Trait } from "lunox";
import type CrudController from "app/Http/Controllers/CrudController";
import type { Request } from "lunox/dist/Http/Request";

export interface DeleteOperation {
  destroy(req: Request, id: number): any;
}
const DeleteOperation: Trait<typeof CrudController> = (s) =>
  class extends s {
    protected setupDeleteRoutes(
      segment: string,
      controller: typeof CrudController
    ) {
      Route.delete(segment + "/:id", [controller, "destroy"], {
        operation: "delete",
        segment,
      });

    }

    /**
     * Add the default settings, buttons, etc that this operation needs.
     */
    protected setupDeleteDefaults() {
      this.crud.allowAccess("delete");

      this.crud.configureOperation("delete", () => {
        this.crud.loadDefaultOperationSettingsFromConfig();
      });
      //  TODO: complete me
    }

    public destroy(req: Request, id: number){
      this.crud.hasAccessOrFail("delete");
      return this.crud.delete(id);
    }
  };

export default DeleteOperation;

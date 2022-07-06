import { Route, Trait } from "lunox";
import type ViewFactory from "lunox/dist/View/Factory";
import type CrudController from "app/Http/Controllers/CrudController";
import type { Request } from "lunox/dist/Http/Request";

export interface ShowOperation {
  show(req: Request, id: number): ViewFactory;
  detail(req: Request, id: number): void;
}
const ShowOperation: Trait<typeof CrudController> = (s) =>
  class extends s {
    protected setupShowRoutes(
      segment: string,
      controller: typeof CrudController
    ) {
      Route.get(segment + "/:id/show", [controller, "show"], {
        operation: "show",
        segment,
      });

      Route.get(segment + "/:id/detail", [controller, "detail"], {
        operation: "show",
        segment,
      });
    }

    /**
     * Add the default settings, buttons, etc that this operation needs.
     */
    protected setupShowDefaults() {
      this.crud.allowAccess("show");

      this.crud.configureOperation("show", () => {
        this.crud.loadDefaultOperationSettingsFromConfig();
      });
      //  TODO: complete me
    }

    /**
     * get show view
     */
    public show(req: Request, id: number) {
      this.crud.hasAccessOrFail("show");
      this.crud.set("title", this.crud.entity_name);
      this.crud.set("id", Number(id));
      this.data.crud = this.crud;
      // this.data should be sent via view context
      // so can be accessed via onServer method on view
      return view(this.crud.getShowView()).withContext(this.data);
    }

    /**
     * get entry detail for show operation.
     */
    public detail(req: Request, id: number) {
      return this.crud.getEntry(id);
    }
  };

export default ShowOperation;

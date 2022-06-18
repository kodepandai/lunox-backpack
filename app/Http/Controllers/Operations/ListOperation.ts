import { Route, Trait } from "lunox";
import type CrudController from "app/Http/Controllers/CrudController";

export interface ListOperation {
  index(): void;
  search(): void;
  showDetailsRow(): void;
}
const ListOperation: Trait<typeof CrudController> = (s) =>
  class extends s {
    protected setupListRoutes(
      segment: string,
      controller: typeof CrudController
    ) {
      Route.get(segment, [controller, "index"]).middleware(
        this.setOperationMiddleware("list")
      );
      Route.post(segment + "/search", [controller, "search"]).middleware(
        this.setOperationMiddleware("list")
      );
      Route.get(segment + "/:id/details", [
        controller,
        "showDetailsRow",
      ]).middleware(this.setOperationMiddleware("list"));
    }

    /**
     * Add the default settings, buttons, etc that this operation needs.
     */
    protected setupListDefaults() {
      this.crud.configureOperation("list", () => {
        this.crud.loadDefaultOperationSettingsFromConfig();
      });
      //  TODO: complete me
    }

    public index() {
      this.data.crud = this.crud;
      this.data.title = this.crud.entity_name_plural;

      // this.data should be sent via view context
      // so can be accessed via onServer method on view
      return view(this.crud.getListView()).withContext(this.data);
    }

    public search() {
      return "search operation";
    }

    public showDetailsRow() {
      return "show details row operation";
    }
  };

export default ListOperation;

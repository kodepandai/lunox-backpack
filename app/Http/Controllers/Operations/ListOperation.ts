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
      Route.get(segment, [controller, "index"], {
        operation: "list",
        segment,
      });
      Route.post(segment + "/search", [controller, "search"], {
        operation: "list",
        segment,
      });
      Route.get(segment + "/:id/details", [controller, "showDetailsRow"], {
        operation: "list",
        segment,
      });
    }

    /**
     * Add the default settings, buttons, etc that this operation needs.
     */
    protected setupListDefaults() {
      this.crud.allowAccess("list");

      this.crud.configureOperation("list", () => {
        this.crud.loadDefaultOperationSettingsFromConfig();
      });
      //  TODO: complete me
    }

    public index() {
      this.crud.hasAccessOrFail("list");

      this.data.crud = this.crud;
      // this.data should be sent via view context
      // so can be accessed via onServer method on view
      return view(this.crud.getListView()).withContext(this.data);
    }

    public search() {
      this.crud.hasAccessOrFail("list");

      return "search operation";
    }

    public showDetailsRow() {
      this.crud.hasAccessOrFail("list");

      return "show details row operation";
    }
  };

export default ListOperation;

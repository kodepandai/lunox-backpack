import { Route, Trait } from "lunox";
import type CrudController from "app/Http/Controllers/CrudController";

export interface ListOperation {
  setupListRoutes(segment: string, controller: typeof CrudController): void;
  index(): void;
  search(): void;
  showDetail(): void;
}
const ListOperation: Trait<typeof CrudController> = (s) =>
  class extends s {
    public setupListRoutes(segment: string, controller: typeof CrudController) {
      Route.get(segment, [controller, "index"]);
      Route.post(segment + "/search", [controller, "search"]);
      Route.get(segment + "/:id", [controller, "showDetail"]);
    }

    public index() {
      this.data.crud = this.crud;

      // TODO: this.data tidak bisa dikirim via parameter view
      // akan break di client side karena data CrudPanel hanya bisa diakses di server.
      return view(this.crud.getListView(), { data: {} });
    }

    public search() {
      return "search operation";
    }

    public showDetail() {
      return "show detail operation";
    }
  };

export default ListOperation;

import type CrudController from "app/Http/Controllers/CrudController";
import { Router as Route, ServiceProvider } from "lunox";
import type { Router } from "lunox/dist/Routing/Router";

class BackpackServiceProvider extends ServiceProvider {
  async register() {
    // register services
    this.addRouteMacro();
  }

  async boot() {
    // bootstrap services
  }

  private addRouteMacro() {
    Route.macro(
      "crud",
      function (
        this: Router,
        segment: string,
        controller: typeof CrudController
      ) {
        const crudInstance = new controller();
        crudInstance.setupRoutes(segment, controller);
      }
    );
  }
}

export default BackpackServiceProvider;

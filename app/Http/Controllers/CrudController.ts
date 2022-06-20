import CrudPanel from "app/Library/CrudPanel/CrudPanel";
import { Controller, ObjectOf, Str } from "lunox";
import type { Middleware } from "lunox/dist/Contracts/Http/Middleware";
import type { CreateOperation } from "./Operations/CreateOperation";
import type { ListOperation } from "./Operations/ListOperation";

// CrudController may have this methods from Crud Traits
interface CrudController extends ListOperation, CreateOperation {}

export interface CrudContext {
  crud: CrudPanel;
  title: string;
}

class CrudController extends Controller {
  public crud!: CrudPanel;
  public data: ObjectOf<any> = {};

  constructor() {
    super();
    if (this.crud) return;

    // create crud panel object
    // we need request instance, done via middleware
    this.middleware({
      handle: async (req, next) => {
        // we just need asign this.crud once
        this.crud = new CrudPanel();

        // TODO: for now crud cannot be singleton, http request will be conflicted
        this.crud.setRequest(req);
        this.setupDefaults();
        this.setup();
        this.setupConfigurationForCurrentOperation();
        return next(req);
      },
    });
  }

  /**
   * Allow developers to set their configuration options for a CrudPanel.
   */
  public setup() {
    // pass
  }

  /**
   * Load routes for all operations.
   * Allow developers to load extra routes by creating a method that looks like setupOperationNameRoutes.
   */
  public setupRoutes(segment: string, controller: typeof CrudController) {
    const matchedMethods = get_class_methods(this)
      .join(";")
      .match(/(?<=^|;)setup([^;]+?)Routes(;|$)/g)
      ?.map((x) => x.replace(";", ""));
    matchedMethods?.forEach((method) => {
      (this as any)[method](segment, controller);
    });
  }

  /**
   * Load defaults for all operations.
   * Allow developers to insert default settings by creating a method
   * that looks like setupOperationNameDefaults.
   */
  public setupDefaults() {
    const matchedMethods = get_class_methods(this)
      .join(";")
      .match(/(?<=^|;)setup([^;]+?)Defaults(;|$)/g)
      ?.map((x) => x.replace(";", ""));
    matchedMethods?.forEach((method) => {
      (this as any)[method]();
    });
  }

  public setupConfigurationForCurrentOperation() {
    const operationName = this.crud.getCurrentOperation();
    const setupClassName = "setup" + Str.studly(operationName) + "Operation";

    this.crud.applyConfigurationFromSettings(operationName);

    // run corresponding setupXxxOperation if it exists.
    if (get_class_methods(this).includes(setupClassName)) {
      (this as any)[setupClassName]();
    }
  }
}

export default CrudController;

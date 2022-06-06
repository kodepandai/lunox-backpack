import CrudPanel from "app/Library/CrudPanel/CrudPanel";
import { Controller, ObjectOf } from "lunox";
import type { ListOperation } from "./Operations/ListOperation";

// CrudController may have this methods from Crud Traits
interface CrudController extends ListOperation {}

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

        // TODO: for now crud cannot be singleton, http request will be conflicted
        this.crud = new CrudPanel();

        this.crud.setRequest(req);
        this.setup();
        return next(req);
      },
    });
  }

  public setup() {
    console.log("run setup");
  }
}

export default CrudController;

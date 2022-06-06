import User from "app/Model/User";
import { Traitable } from "lunox";
import CrudController from "./CrudController";
import ListOperation from "./Operations/ListOperation";

class UserCrudController extends Traitable(CrudController).use(ListOperation) {
  public setup(): void {
    // super.setup();
    this.crud.setEntityNameStrings("User", "Users");
    this.crud.setModel(User);
  }
}

export default UserCrudController;

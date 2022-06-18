import User from "app/Model/User";
import { Traitable } from "lunox";
import CrudController from "./CrudController";
import ListOperation from "./Operations/ListOperation";

class UserCrudController extends Traitable(CrudController).use(ListOperation) {
  public setup(): void {
    this.crud.setEntityNameStrings("User", "Users");
    this.crud.setModel(User);
  }

  public setupListOperation() {
    this.crud.addColumn({
      name: "email",
    });
    this.crud.addColumn({
      name: "username",
      label: "User Name",
    });
    this.crud.addColumn({
      name: "fullname",
      label: "Full Name",
    });
    this.crud.addColumn({
      name: "created_at",
      label: "Joined at",
      type: "date",
      format: "DD MMM YYYY",
    });
  }
}

export default UserCrudController;

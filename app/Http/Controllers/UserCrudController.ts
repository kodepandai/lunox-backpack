import User from "app/Model/User";
import { Traitable } from "lunox";
import CrudController from "./CrudController";
import CreateOperation from "./Operations/CreateOperation";
import ListOperation from "./Operations/ListOperation";

class UserCrudController extends Traitable(CrudController).use(
  ListOperation,
  CreateOperation
) {
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

  public setupCreateOperation() {
    this.crud.addField({
      name: "email",
      grid: 6,
    });

    this.crud.addField({
      name: "username",
      label: "User Name",
      grid: 6,
    });

    this.crud.addField({
      name: "fullname",
      label: "Full Name",
      grid: 6,
    });

    this.crud.addField({
      name: "phone",
      label: "Phone Number",
      grid: 6,
    });

    this.crud.addField({
      name: "password",
      type: "password",
      grid: 6,
    });

    this.crud.addField({
      name: "password_confirm",
      label: "Confirm Password",
      type: "password",
      grid: 6,
    });
  }
}

export default UserCrudController;

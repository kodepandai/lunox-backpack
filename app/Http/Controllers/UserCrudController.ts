import ApiException from "app/Exceptions/ApiException";
import User from "app/Model/User";
import { Traitable } from "lunox";
import type { Request } from "lunox/dist/Http/Request";
import UserRequest from "../Request/UserRequest";
import CrudController from "./CrudController";
import CreateOperation from "./Operations/CreateOperation";
import DeleteOperation from "./Operations/DeleteOperation";
import ListOperation from "./Operations/ListOperation";
import ShowOperation from "./Operations/ShowOperation";
import UpdateOperation from "./Operations/UpdateOperation";

class UserCrudController extends Traitable(CrudController).use(
  ListOperation,
  ShowOperation,
  CreateOperation,
  UpdateOperation,
  DeleteOperation
) {
  public setup(): void {
    this.crud.setEntityNameStrings("User", "Users");
    this.crud.setModel(User);
  }

  private setupDefaultColumns() {
    this.crud.addColumn({
      name: "email",
    });
    this.crud.addColumn({
      name: "user_name",
      label: "User Name",
    });
    this.crud.addColumn({
      name: "full_name",
    });
    this.crud.addColumn({
      name: "created_at",
      label: "Joined at",
      type: "date",
      format: "DD MMM YYYY",
    });
  }

  public setupListOperation() {
    this.setupDefaultColumns();
  }

  public setupShowOperation() {
    this.setupDefaultColumns();

    this.crud.addColumn({
      name: "phone",
      label: "Phone Number",
    });

    this.crud.addColumn({
      name: "active",
      label: "Status",
      format: (val: string) => (val ? "active" : "inactive"),
    });
  }

  public setupCreateOperation() {
    this.setupDefaultFields();
  }

  public setupUpdateOperation() {
    this.setupDefaultFields();
  }

  public setupDefaultFields() {
    this.crud.setValidation(UserRequest);
    this.crud.addField({
      name: "email",
      grid: 6,
    });

    this.crud.addField({
      name: "user_name",
      label: "User Name",
      grid: 6,
    });

    this.crud.addField({
      name: "first_name",
      label: "First Name",
      grid: 6,
    });

    this.crud.addField({
      name: "last_name",
      label: "Last Name",
      grid: 6,
    });

    this.crud.addField({
      name: "phone",
      label: "Phone Number",
      grid: 6,
      break: true,
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

  public async destroy(req: Request, id: number) {
    if (id == 1) {
      throw new ApiException("Cannot delete super admin!");
    }
    if ((await req.auth().user())?.id == id) {
      throw new ApiException("Cannot delete current user!");
    }
    super.destroy(req, id);
  }
}

export default UserCrudController;

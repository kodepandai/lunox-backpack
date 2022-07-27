import CrudRequest from "app/Library/CrudRequest";
import type { ObjectOf } from "lunox";
class UserRequest extends CrudRequest {
  public rules() {
    return {
      email: "required|email",
      user_name: "required",
      password: `${this.passwordRequiredOrNullable()}|minLength:4`,
      password_confirm: `${this.passwordRequiredOrNullable()}|same:password`,
    };
  }

  public attributes(): ObjectOf<any> {
    return {
      password_confirm: "password confirmation",
    };
  }

  private passwordRequiredOrNullable() {
    return this.crud.getCurrentOperation() == "create"
      ? "required"
      : "nullable";
  }
}

export default UserRequest;

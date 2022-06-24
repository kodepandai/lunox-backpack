import { FormRequest, ObjectOf } from "lunox";
class UserRequest extends FormRequest {
  public rules() {
    return {
      email: "required|email",
      username: "required",
      password: "required|minLength:4",
      password_confirm: "required|same:password",
    };
  }

  public attributes(): ObjectOf<any> {
    return {
      password_confirm: "password confirmation",
    };
  }
}

export default UserRequest;

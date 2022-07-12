import { Model, Traitable, Authenticatable } from "lunox";
import type { Authenticatable as Auth } from "lunox/dist/Contracts/Auth/Authenticatable";
import CrudTrait from "./Traits/CrudTrait";
import bcrypt from "bcryptjs";

interface User extends Auth {}
class User extends Traitable(Model).use(Authenticatable, CrudTrait) {
  // this will make typescript happy
  static factory: () => any;
  user_name!: string;
  email!: string;
  password!: string;
  first_name!: string;
  last_name!: string;
  phone!: string;
  active!: boolean;

  public static fillable = [
    "user_name",
    "email",
    "password",
    "first_name",
    "last_name",
    "phone",
  ];

  protected static hidden = ["password"];

  protected static table = "users";

  // protected static primaryKey = "id";
  // protected static timestamps = true;

  public setPasswordAttribute(value: string) {
    if (!value) return;
    this.attributes["password"] = bcrypt.hashSync(
      value,
      bcrypt.genSaltSync(10)
    );
  }

  public getFullNameAttribute() {
    return this.first_name + " " + this.last_name;
  }
}
export default User;

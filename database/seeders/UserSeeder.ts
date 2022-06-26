import User from "app/Model/User";
import { Seeder } from "lunox";
class UserSeeder extends Seeder {
  public async run() {
    await User.query().del();
    await User.query().insert({
      username: "user",
      email: "user@example.mail",
      first_name: "John",
      last_name: "Doe",
      password: "password",
    });
  }
}
export default UserSeeder;

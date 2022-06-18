import AuthController from "app/Http/Controllers/AuthController";
import UserCrudController from "app/Http/Controllers/UserCrudController";
import { Route } from "lunox";

Route.get("/", () => {
  return redirect("/admin");
});
Route.get("/login", [AuthController, "showLogin"]);
Route.post("/login", [AuthController, "postLogin"]);
Route.get("/logout", [AuthController, "logout"]);

await Route.middleware("auth")
  .prefix("/admin")
  .group(() => {
    Route.get("/", () => view("admin", { version: app("version") }));
    Route.crud("/user", UserCrudController);
  });

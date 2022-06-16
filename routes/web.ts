import AuthController from "app/Http/Controllers/AuthController";
import UserCrudController from "app/Http/Controllers/UserCrudController";
import WelcomeController from "app/Http/Controllers/WelcomeController";
import { Route } from "lunox";

Route.get("/", [WelcomeController, "home"]);
Route.get("/login", [AuthController, "showLogin"]);
Route.post("/login", [AuthController, "postLogin"]);
Route.get("/logout", [AuthController, "logout"]);

await Route.middleware("auth")
  .prefix("/admin")
  .group(() => {
    Route.get("/", () => view("admin", { version: app("version") }));
    Route.crud("/user", UserCrudController);
  });

import AppServiceProvider from "app/Providers/AppServiceProvider";
import BackpackServiceProvider from "app/Providers/BackpackServiceProvider";
import ExceptionServiceProvider from "app/Providers/ExceptionServiceProvider";
import RouteServiceProvider from "app/Providers/RouteServiceProvider";
import {
  FilesystemServiceProvider,
  ValidationServiceProvider,
  DatabaseServiceProvider,
  ViewServiceProvider,
  SessionServiceProvider,
  AuthServiceProvider,
  EncryptionServiceProvider,
} from "lunox";
import type { AppConfig } from "lunox/dist/Contracts/Config";

const app: AppConfig = {
  name: env("APP_NAME", "Lunox Backpack"),
  env: env("APP_ENV", "production"),
  key: env("APP_KEY"),
  cipher: "aes-128-cbc",
  providers: [
    // lunox service providers
    FilesystemServiceProvider,
    DatabaseServiceProvider,
    EncryptionServiceProvider,
    SessionServiceProvider,
    AuthServiceProvider,
    ValidationServiceProvider,
    ViewServiceProvider,

    BackpackServiceProvider,

    // app service providers
    AppServiceProvider,
    ExceptionServiceProvider,
    RouteServiceProvider,
  ],
};
export default app;

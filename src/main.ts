import configureRoutes from "configureRoutes";
import { createBrowserHistory } from "history";
import "normalize.css";
import {
  ExampleDynamicPage,
  HomePage,
  InternalErrorPage,
  NotFoundPage
} from "pages";
import "./style.css";

const appRootElement = <HTMLDivElement | null>document.getElementById("app");

if (!appRootElement)
  throw new Error("Application requires a root element with `#app` id.");

const history = createBrowserHistory();

configureRoutes(appRootElement, history, {
  errorPage: InternalErrorPage,
  notFoundPage: NotFoundPage,
  routes: [
    { path: "/", page: HomePage },
    { path: "/user/:id", page: ExampleDynamicPage }
  ]
});

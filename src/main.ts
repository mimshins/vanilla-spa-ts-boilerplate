import { InternalError, NotFoundError } from "errors";
import { createBrowserHistory, type Location } from "history";
import {
  ExampleDynamicPage,
  HomePage,
  InternalErrorPage,
  NotFoundPage
} from "pages";
import { createDynamicRoute, handleDynamicRoutes } from "utils";
import "normalize.css";
import "./style.css";

const appRootElement = <HTMLDivElement | null>document.getElementById("app");

if (!appRootElement)
  throw new Error("Application requires a root element with `#app` id.");

const history = createBrowserHistory();

const switchRoutes = (location: Location) => {
  try {
    switch (location.pathname) {
      case "/":
        return HomePage({ appRootElement, history, pageProps: {} });
      default: {
        // In default we match dynamic routes
        const matched = handleDynamicRoutes(location, [
          createDynamicRoute("/user/:id", ExampleDynamicPage, {
            appRootElement,
            history,
            pageProps: {}
          })
        ]);

        if (!matched) throw new NotFoundError();
      }
    }
  } catch (err) {
    if (err instanceof NotFoundError) {
      return NotFoundPage({
        appRootElement,
        history,
        pageProps: { message: err.message }
      });
    } else if (err instanceof InternalError) {
      return InternalErrorPage({
        appRootElement,
        history,
        pageProps: { message: err.message }
      });
    }

    return InternalErrorPage({
      appRootElement,
      history,
      pageProps: {}
    });
  }
};

// Initial routing
switchRoutes(history.location);

// Listen for route changes
history.listen(({ location }) => switchRoutes(location));

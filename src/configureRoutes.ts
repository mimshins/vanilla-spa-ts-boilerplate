import { InternalError, NotFoundError } from "errors";
import { type BrowserHistory, type Location } from "history";
import Page from "Page";
import { match, type Path } from "path-to-regexp";
import type { PageClassType, PageContext } from "types";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Config {
  routes: {
    path: Path;
    page: PageClassType<any, any>;
    props?: PageContext<any, any>["pageProps"];
  }[];
  notFoundPage: PageClassType<any, any>;
  errorPage: PageClassType<any, any>;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

const onPageMount = (callback: () => void) => {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    // call on next available tick
    setTimeout(callback, 1);
  } else {
    document.addEventListener("DOMContentLoaded", () => callback());
  }
};

const configureRoutes = (
  appRootElement: HTMLDivElement,
  history: BrowserHistory,
  config: Config
) => {
  const { errorPage, notFoundPage, routes } = config;

  const switchRoutes = (location: Location) => {
    let page: Page | null = null;

    try {
      for (const route of routes) {
        const matcher = match(route.path, { decode: decodeURIComponent });

        const matched = matcher(location.pathname);
        if (!matched) continue;

        page = new route.page({
          history,
          pageProps: <unknown>route.props ?? {},
          params: matched.params
        });

        break;
      }

      if (page == null) throw new NotFoundError();
    } catch (err) {
      if (err instanceof NotFoundError) {
        page = new notFoundPage({
          history,
          pageProps: { message: err.message }
        });
      } else if (err instanceof InternalError) {
        page = new errorPage({
          history,
          pageProps: { message: err.message }
        });
      } else page = new errorPage({ history, pageProps: {} });
    }

    onPageMount(page.onMount.bind(page));
    appRootElement.innerHTML = page.initialRender();
  };

  // Listen for route changes
  history.listen(({ location }) => switchRoutes(location));

  // Initial routing
  switchRoutes(history.location);
};

export default configureRoutes;

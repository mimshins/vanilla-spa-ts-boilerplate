import { InternalError, NotFoundError } from "errors";
import { type Location, type BrowserHistory } from "history";
import { match, type Path } from "path-to-regexp";
import type { Page, PageContext } from "types";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Config {
  routes: {
    path: Path;
    page: Page<any, any>;
    props?: PageContext<any, any>["pageProps"];
  }[];
  notFoundPage: Page<any, any>;
  errorPage: Page<any, any>;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

const configureRoutes = (
  appRootElement: HTMLDivElement,
  history: BrowserHistory,
  config: Config
) => {
  const { errorPage, notFoundPage, routes } = config;

  const switchRoutes = (location: Location) => {
    const pageContent: { __html: string | null } = { __html: null };

    try {
      for (const route of routes) {
        const matcher = match(route.path, { decode: decodeURIComponent });

        const matched = matcher(location.pathname);
        if (!matched) continue;

        pageContent.__html = route.page({
          history,
          pageProps: <unknown>route.props ?? {},
          params: matched.params
        });

        break;
      }

      if (pageContent.__html == null) throw new NotFoundError();
    } catch (err) {
      if (err instanceof NotFoundError) {
        pageContent.__html = notFoundPage({
          history,
          pageProps: { message: err.message }
        });
      } else if (err instanceof InternalError) {
        pageContent.__html = errorPage({
          history,
          pageProps: { message: err.message }
        });
      } else pageContent.__html = errorPage({ history, pageProps: {} });
    }

    appRootElement.innerHTML = pageContent.__html;
  };

  // Listen for route changes
  history.listen(({ location }) => switchRoutes(location));

  // Initial routing
  switchRoutes(history.location);
};

export default configureRoutes;

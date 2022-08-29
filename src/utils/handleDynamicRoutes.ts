import type { Location } from "history";
import { match, type Path } from "path-to-regexp";
import type { Page } from "types";

type Route<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  P extends Page<any, any>
> = (location: Location) => { page: P; pageContext: Parameters<P>[0] } | null;

export const createDynamicRoute = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  P extends Page<any, any>
>(
  path: Path,
  page: P,
  pageContext: Parameters<P>[0]
): Route<P> => {
  const matcher = match(path, { decode: decodeURIComponent });

  return location => {
    const matches = matcher(location.pathname);

    return matches
      ? { page, pageContext: { ...pageContext, params: matches.params } }
      : null;
  };
};

const handleDynamicRoutes = (
  location: Location,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rotues: Route<Page<any, any>>[]
) => {
  return rotues.some(route => {
    const matchResult = route(location);

    if (!matchResult) return false;
    const { page, pageContext } = matchResult;

    page(pageContext);
    return true;
  });
};

export default handleDynamicRoutes;

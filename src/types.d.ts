import { type BrowserHistory } from "history";

export type ObjectKeys = string | number | symbol;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObject = Record<ObjectKeys, any>;
// eslint-disable-next-line @typescript-eslint/ban-types
export type EmptyObject = {};

export interface PageContext<PageProps = EmptyObject, Params = EmptyObject> {
  pageProps: PageProps;
  params?: Params;
  history: BrowserHistory;
  appRootElement: HTMLDivElement;
}

export type Page<PageProps = EmptyObject, Params = EmptyObject> = (
  pageContext: PageContext<PageProps, Params>
) => void;

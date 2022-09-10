import type { EmptyObject, PageContext } from "types";

export default class Page<PageProps = EmptyObject, Params = EmptyObject> {
  public readonly history: PageContext["history"];
  public readonly props: PageProps;
  public readonly params: Params | undefined;

  constructor(ctx: PageContext<PageProps, Params>) {
    this.history = ctx.history;
    this.params = ctx.params;
    this.props = ctx.pageProps;
  }

  onMount() {
    return;
  }

  initialRender() {
    return "";
  }
}

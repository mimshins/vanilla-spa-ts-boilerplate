import { NotFoundError } from "errors";
import Page from "Page";
import type { EmptyObject, PageContext } from "types";

interface PageParams {
  id: string;
}

class ExampleDynamicPage extends Page<EmptyObject, PageParams> {
  constructor(ctx: PageContext<EmptyObject, PageParams>) {
    super(ctx);

    const id = this.params?.id;
    if (!id || id !== "123") throw new NotFoundError();
  }

  override onMount(): void {
    return;
  }

  override initialRender(): string {
    return `
      <h1>Dynamic Page</h1>
    `;
  }
}

export default ExampleDynamicPage;

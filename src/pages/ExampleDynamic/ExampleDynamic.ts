import { NotFoundError } from "errors";
import type { EmptyObject, Page } from "types";

interface PageParams {
  id: string;
}

const ExampleDynamic: Page<EmptyObject, PageParams> = ({ params }) => {
  const id = params?.id;

  if (!id || id !== "123") throw new NotFoundError();

  return `
    <h1>Dynamic Page</h1>
  `;
};

export default ExampleDynamic;

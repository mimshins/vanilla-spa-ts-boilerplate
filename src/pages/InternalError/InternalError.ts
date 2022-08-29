import type { Page } from "types";

interface PageProps {
  message?: string;
}

const InternalError: Page<PageProps> = ({ pageProps }) => {
  const { message } = pageProps;

  return `
    <h1>${message || "5xx | Internal Error"}</h1>
  `;
};

export default InternalError;

import type { Page } from "types";

interface PageProps {
  message?: string;
}

const InternalError: Page<PageProps> = ({ appRootElement, pageProps }) => {
  const { message } = pageProps;

  appRootElement.innerHTML = `
    <h1>${message || "5xx | Internal Error"}</h1>
  `;
};

export default InternalError;

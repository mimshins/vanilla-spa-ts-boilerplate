import type { Page } from "types";

interface PageProps {
  message?: string;
}

const NotFound: Page<PageProps> = ({ appRootElement, pageProps }) => {
  const { message } = pageProps;

  appRootElement.innerHTML = `
    <h1>${message || "404 | Page Not Found"}</h1>
  `;
};

export default NotFound;

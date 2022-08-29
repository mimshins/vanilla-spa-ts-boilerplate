import type { Page } from "types";

interface PageProps {
  message?: string;
}

const NotFound: Page<PageProps> = ({ pageProps }) => {
  const { message } = pageProps;

  return `
    <h1>${message || "404 | Page Not Found"}</h1>
  `;
};

export default NotFound;

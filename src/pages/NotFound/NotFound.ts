import Page from "Page";

interface PageProps {
  message?: string;
}

class NotFoundPage extends Page<PageProps> {
  override onMount(): void {
    return;
  }

  override initialRender(): string {
    const { message } = this.props;

    return `
      <h1>${message || "404 | Page Not Found"}</h1>
    `;
  }
}

export default NotFoundPage;

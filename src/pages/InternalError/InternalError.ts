import Page from "Page";

interface PageProps {
  message?: string;
}

class InternalErrorPage extends Page<PageProps> {
  override onMount(): void {
    return;
  }

  override initialRender(): string {
    const { message } = this.props;

    return `
      <h1>${message || "5xx | Internal Error"}</h1>
    `;
  }
}

export default InternalErrorPage;

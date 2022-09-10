import Page from "Page";

class HomePage extends Page {
  override onMount(): void {
    console.log(document.getElementById("title"));
  }

  override initialRender(): string {
    return `
      <h1 id="title">Home Page</h1>
    `;
  }
}

export default HomePage;

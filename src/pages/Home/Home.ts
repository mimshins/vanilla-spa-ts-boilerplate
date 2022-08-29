import type { Page } from "types";

const Home: Page = ({ appRootElement }) => {
  appRootElement.innerHTML = `
    <h1>Home Page</h1>
  `;
};

export default Home;

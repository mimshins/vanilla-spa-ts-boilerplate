import type { Page } from "types";
import { onPageMount } from "utils";

const Home: Page = () => {
  onPageMount(() => {
    console.log(document.getElementById("title"));
  });

  return `
    <h1 id="title">Home Page</h1>
  `;
};

export default Home;

const onMount = (callback: () => void) => {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    // call on next available tick
    setTimeout(callback, 1);
  } else {
    document.addEventListener("DOMContentLoaded", () => callback());
  }
};

export default onMount;

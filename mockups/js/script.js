import { init } from "./init.js";

document.body.classList.remove("no-js");
document.body.classList.add("js");

document.onreadystatechange = async () => {
  if (document.readyState === "complete") {
    document.body.classList.add("is-complete");
    document.body.classList.remove("is-loading");

    init();
  }
};

import chokidar from "chokidar";
import { execSync } from "child_process";

const targets = ["src", "static", "data", "views", "config"];

const watcher = chokidar.watch(targets);

const log = console.log.bind(console);

watcher
  .on("ready", () => log("Initial scan complete. Ready for changes"))
  .on("all", (event, path) => {
    log(`File ${path} has been changed`);
    execSync("npm run build:dev");
  });

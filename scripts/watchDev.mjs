import chokidar from "chokidar";
import { execSync } from "child_process";

const targets = ["client"];

const watcher = chokidar.watch(targets, {
  ignored: /dist/,
});

const log = console.log.bind(console);

watcher.on("ready", () => {
  log("Initial scan complete. Ready for changes");
  watcher.on("all", (event, path) => {
    log(`File ${path} has been changed`);
    execSync("npm run build:dev");
  });
});

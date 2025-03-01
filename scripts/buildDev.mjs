import fs from "fs";
import * as esbuild from "esbuild";
import ejs from "ejs";

// Clear dist folder
try {
  fs.rmSync("client/dist", { recursive: true, force: true });
  fs.cpSync("client/static", "client/dist", { recursive: true });
} catch (error) {
  console.error(error);
}

const mode = process.env.NODE_ENV || "development";
const sources = {};
const cssConfig = {
  entryPoints: ["client/src/css/index.css"],
  bundle: true,
  loader: { ".webp": "dataurl" },
  outfile: "client/dist/bundle.css",
};
const jsConfig = {
  entryPoints: ["client/src/js/index.js"],
  bundle: true,
  outfile: "client/dist/bundle.js",
};

await esbuild.build(jsConfig);
await esbuild.build(cssConfig);

sources.css = "bundle.css";
sources.js = "bundle.js";

// Build HTML from views folder
try {
  const files = fs
    .readdirSync("client/views")
    .filter((file) => file.endsWith(".ejs"));

  files.forEach((file) => {
    const filename = file.split(".")[0];
    ejs.renderFile(`client/views/${file}`, { mode, sources }, (err, str) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      if (filename === "index") {
        fs.writeFileSync("client/dist/index.html", str);
      } else {
        fs.mkdirSync(`client/dist/${filename}`, { recursive: true });
        fs.writeFileSync(`client/dist/${filename}/index.html`, str);
      }
    });
  });
} catch (error) {
  console.error(error);
}

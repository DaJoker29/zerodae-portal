import fs from "fs";
import * as esbuild from "esbuild";
import ejs from "ejs";

// Clear dist folder
try {
  fs.rmSync("dist", { recursive: true, force: true });
  fs.cpSync("static", "dist", { recursive: true });
} catch (error) {
  console.error(error);
}

const mode = process.env.NODE_ENV || "development";
const sources = {};
const cssConfig = {
  entryPoints: ["src/css/index.css"],
  bundle: true,
  loader: { ".webp": "dataurl" },
  outfile: "dist/bundle.css",
};
const jsConfig = {
  entryPoints: ["src/js/index.js"],
  bundle: true,
  outfile: "dist/bundle.js",
};

await esbuild.build(jsConfig);
await esbuild.build(cssConfig);

sources.css = "bundle.css";
sources.js = "bundle.js";

// Build HTML from views folder
try {
  const files = fs.readdirSync("views").filter((file) => file.endsWith(".ejs"));

  files.forEach((file) => {
    const filename = file.split(".")[0];
    ejs.renderFile(`views/${file}`, { mode, sources }, (err, str) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      if (filename === "index") {
        fs.writeFileSync("dist/index.html", str);
      } else {
        fs.mkdirSync(`dist/${filename}`, { recursive: true });
        fs.writeFileSync(`dist/${filename}/index.html`, str);
      }
    });
  });
} catch (error) {
  console.error(error);
}

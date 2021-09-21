const fs = require("fs-extra");
const archiver = require("archiver");

function zip(src, dist) {
  return new Promise((resolve, reject) => {
    const archive = archiver.create("zip", {});
    const output = fs.createWriteStream(dist);

    // listen for all archive data to be written
    output.on("close", () => {
      console.log(`${archive.pointer()} total bytes`);
      console.log(
        "Archiver has been finalized and the output file descriptor has closed."
      );
      resolve();
    });

    // good practice to catch this error explicitly
    archive.on("error", (err) => {
      reject(err);
    });

    archive.pipe(output);
    archive.directory(src).finalize();
  });
}

(async () => {
  try {
    fs.mkdirSync("awesome");
    fs.copySync("components", "./awesome/components");
    fs.copySync("contents", "./awesome/contents");
    fs.copySync("hooks", "./awesome/hooks");
    fs.copySync("pages", "./awesome/pages");
    fs.copySync("public", "./awesome/public");
    fs.copySync("styles", "./awesome/styles");
    fs.copySync("types", "./awesome/types");
    fs.copySync("utils", "./awesome/utils");
    fs.copyFileSync(".babelrc", "./awesome/.babelrc");
    fs.copyFileSync(".editorconfig", "./awesome/.editorconfig");
    fs.copyFileSync(".eslintrc", "./awesome/.eslintrc");
    fs.copyFileSync(".gitignore", "./awesome/.gitignore");
    fs.copyFileSync("blog.config.ts", "./awesome/blog.config.ts");
    fs.copyFileSync("next-env.d.ts", "./awesome/next-env.d.ts");
    fs.copyFileSync("next-sitemap.js", "./awesome/next-sitemap.js");
    fs.copyFileSync("next.config.js", "./awesome/next.config.js");
    fs.copyFileSync("package.json", "./awesome/package.json");
    fs.copyFileSync("postcss.config.js", "./awesome/postcss.config.js");
    fs.copyFileSync("README.md", "./awesome/README.md");
    fs.copyFileSync("tsconfig.json", "./awesome/tsconfig.json");
    fs.copyFileSync("vercel.json", "./awesome/vercel.json");
    fs.copyFileSync("yarn.lock", "./awesome/yarn.lock");
    fs.copyFileSync(".env", "./awesome/.env");
    fs.copyFileSync(".env.local", "./awesome/.env.local");
    await zip("./awesome", `./awesome.zip`);
    fs.removeSync("./awesome");
  } catch (e) {
    console.error(e);
  }
})();

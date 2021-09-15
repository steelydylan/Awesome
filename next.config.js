const withCSS = require("@zeit/next-css");
const withMdxFm = require("next-mdx-frontmatter")();
const withImages = require("next-images");

module.exports = withImages(
  withMdxFm(
    withCSS({
      exportTrailingSlash: true,
    })
  )
);

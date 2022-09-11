const withMdxFm = require("next-mdx-frontmatter")();

module.exports = withMdxFm({
  images: {
    domains: ["s3.us-west-2.amazonaws.com"],
  },
});

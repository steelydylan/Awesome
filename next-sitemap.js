const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ["/dynamic-sitemap.xml", "/api/*"],
  robotsTxtOptions: {
    additionalSitemaps: [`${siteUrl}/dynamic-sitemap.xml`],
  },
};

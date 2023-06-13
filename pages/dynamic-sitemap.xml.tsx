import { GetServerSideProps } from "next";
import { getServerSideSitemap } from "next-sitemap";
import { getArticles } from "@/utils/get-articles";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const articles = await getArticles();

  const fields = articles.map((article) => ({
    loc: `${baseUrl}/articles/${article.slug}`,
    lastmod: new Date(article.data.date).toISOString(),
    changefreq: "daily" as const,
  }));

  return getServerSideSitemap(ctx, fields);
};

export default () => {};

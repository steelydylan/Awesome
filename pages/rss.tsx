import { GetServerSideProps } from "next";
import Rss from "rss";
import { getArticles } from "@/utils/get-articles";
import blogConfig from "@/blog.config";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { res } = ctx;

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/rss+xml;charset=utf-8");

  const url = process.env.NEXT_PUBLIC_SITE_URL;
  const articles = await getArticles();

  const rss = new Rss({
    title: blogConfig.title,
    site_url: url,
    feed_url: `${url}/rss`,
    language: "ja",
    description: blogConfig.description,
    copyright: `©︎${blogConfig.title}`,
  });

  articles.forEach((article) => {
    rss.item({
      title: article.data.title,
      url: `${url}/${article.slug}`,
      description: article.excerpt,
      date: new Date(article.data.date),
    });
  });

  res.end(rss.xml());

  return { props: {} };
};

export default () => {};

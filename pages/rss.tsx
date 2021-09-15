import { GetServerSideProps } from "next";
import Rss from "rss";
import { getPosts } from "@/utils/get-posts";
import blogConfig from "@/blog.config";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { res } = ctx;

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/rss+xml;charset=utf-8");

  const url = process.env.NEXT_PUBLIC_SITE_URL;
  const posts = getPosts();

  const rss = new Rss({
    title: blogConfig.title,
    site_url: url,
    feed_url: `${url}/rss`,
    language: "ja",
    description: blogConfig.description,
    copyright: `©︎${blogConfig.title}`,
  });

  posts.forEach((post) => {
    rss.item({
      title: post.data.title,
      url: `${url}/${post.slug}`,
      description: post.excerpt,
      date: new Date(post.data.date),
    });
  });

  res.end(rss.xml());

  return { props: {} };
};

export default () => {};

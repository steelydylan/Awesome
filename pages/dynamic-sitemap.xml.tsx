import { GetServerSideProps } from "next";
import { getServerSideSitemap } from "next-sitemap";
import { getPosts } from "@/utils/get-posts";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const posts = getPosts();

  const fields = posts.map((post) => ({
    loc: `${baseUrl}/articles/${post.slug}`,
    lastmod: new Date(post.data.date).toISOString(),
    changefreq: "daily",
  }));

  return getServerSideSitemap(ctx, fields);
};

export default () => {};

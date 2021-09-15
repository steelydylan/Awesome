import { GetStaticPaths } from "next";
import { NextSeo } from "next-seo";
import { getPosts } from "@/utils/get-posts";
import { Layout } from "@/components/layout";
import { Entry } from "@/types";
import {
  ArticleLink,
  ArticleList,
  LatestArticle,
  AritcleColumn,
} from "@/components/articles";
import { ArticleCard } from "@/components/articles/card";
import { Title } from "@/components/texts";
import { Pager } from "@/components/pager";
import blogConfig from "@/blog.config";
import { Side } from "@/components/layouts/side";
import { Wrapper } from "@/components/common/wrapper";

export default ({
  posts,
  current,
  max,
}: {
  posts: Entry[];
  current: number;
  max: number;
}) => {
  return (
    <Layout>
      <Wrapper>
        <ArticleList>
          <Title>New Posts</Title>
          <LatestArticle>
            {posts.map((post) => (
              <AritcleColumn key={post.slug} column={2}>
                <ArticleLink href={`/${post.data.category}/${post.slug}`}>
                  <ArticleCard entry={post.data} />
                </ArticleLink>
              </AritcleColumn>
            ))}
          </LatestArticle>
          <Pager current={current} max={max} />
        </ArticleList>
        <Side />
      </Wrapper>
      <NextSeo canonical={process.env.NEXT_PUBLIC_SITE_URL} />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getPosts();
  const paths = [];
  posts.forEach((post, index) => {
    if ((index + 1) % blogConfig.article.articlesPerPage === 0) {
      paths.push({
        params: {
          id: `${(index + 1) / blogConfig.article.articlesPerPage + 1}`,
        },
      });
    }
  });
  return { paths, fallback: false };
};

export const getStaticProps = ({ params }) => {
  const posts = getPosts();
  const { id } = params;
  const current = parseInt(id, 10) - 1;
  return {
    props: {
      current: current + 1,
      max: Math.ceil(posts.length / blogConfig.article.articlesPerPage),
      posts: posts
        .sort((postA, postB) => {
          if (postA.data.date > postB.data.date) {
            return -1;
          }
          return 1;
        })
        .slice(
          current * blogConfig.article.articlesPerPage,
          current * blogConfig.article.articlesPerPage + blogConfig.article.articlesPerPage
        )
        .map((post) => {
          const { content, ...others } = post;
          return others;
        }),
    },
  };
};

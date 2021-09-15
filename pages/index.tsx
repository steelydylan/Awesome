import Link from "next/link";
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
import { Wrapper } from "@/components/common/wrapper";
import blogConfig from "@/blog.config";
import { Hero } from "@/components/common/hero";

export default ({ posts }: { posts: Entry[] }) => {
  return (
    <Layout>
      <Hero
        title={blogConfig.hero.title}
        description={blogConfig.hero.description}
      />
      <Wrapper>
        <main className="main">
          <ArticleList>
            <Title>NEW POSTS</Title>
            <LatestArticle>
              {posts.map((post) => (
                <AritcleColumn key={post.slug} column={3}>
                  <ArticleLink href={`/${post.data.category}/${post.slug}`}>
                    <ArticleCard entry={post.data} />
                  </ArticleLink>
                </AritcleColumn>
              ))}
            </LatestArticle>
            {posts.length > blogConfig.article.articlesPerPage && (
              <Link href="/page/2">
                <a href="/page/2" className="readmore">
                  Read More
                </a>
              </Link>
            )}
          </ArticleList>
        </main>
      </Wrapper>
      <style jsx>
        {`
          .main {
            width: 100%;
          }
          .readmore {
            color: #fff;
            background-color: var(--c-primary);
            font-size: var(--text-lg);
            font-weight: bold;
            display: block;
            width: 240px;
            margin: 0 auto;
          }
        `}
      </style>
    </Layout>
  );
};

export const getStaticProps = () => {
  const posts = getPosts();

  return {
    props: {
      current: 1,
      max: Math.ceil(posts.length / blogConfig.article.articlesPerPage),
      posts: posts
        .sort((postA, postB) => {
          if (postA.data.date > postB.data.date) {
            return -1;
          }
          return 1;
        })
        .slice(0, blogConfig.article.articlesPerPage)
        .map((post) => {
          const { content, ...others } = post;
          return others;
        }),
    },
  };
};

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
import { LinkButton } from "@/components/buttons";

export default ({ posts, max }: { posts: Entry[]; max: number }) => {
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
            <div className="link-button-wrap">
              {max > 1 && <LinkButton href="/page/2">Read More</LinkButton>}
            </div>
          </ArticleList>
        </main>
      </Wrapper>
      <style jsx>
        {`
          .main {
            width: 100%;
          }
          .link-button-wrap {
            text-align: center;
            margin-top: 30px;
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

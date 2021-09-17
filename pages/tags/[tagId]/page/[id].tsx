import { NextSeo } from "next-seo";
import { Layout } from "@/components/layout";
import {
  LatestArticle,
  ArticleLink,
  AritcleColumn,
  ArticleList,
} from "@/components/articles";
import { ArticleCard } from "@/components/articles/card";
import { Title } from "@/components/texts";
import { getPosts } from "@/utils/get-posts";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Entry, Tag } from "@/types";
import blogConfig from "@/blog.config";
import { Wrapper } from "@/components/common/wrapper";
import { Pager } from "@/components/pager";

type Props = {
  tag: Tag;
  posts: Entry[];
  current: number;
  max: number;
};

const TagPage: NextPage<Props> = (props) => {
  const { tag, posts, current, max } = props;

  return (
    <Layout>
      <div className="tag">
        <Title>{tag.title}</Title>
      </div>
      <Wrapper>
        <ArticleList>
          <LatestArticle>
            {posts.map((post) => (
              <AritcleColumn key={post.slug} column={3}>
                <ArticleLink href={`/${post.data.category}/${post.slug}`}>
                  <ArticleCard entry={post.data} />
                </ArticleLink>
              </AritcleColumn>
            ))}
          </LatestArticle>
          <Pager current={current} max={max} append={`/tags/${tag.id}`} />
        </ArticleList>
      </Wrapper>
      <style jsx>
        {`
          .link-button-wrap {
            text-align: center;
            margin-top: 30px;
          }
          .tag {
            margin-top: 50px;
          }
        `}
      </style>
      <NextSeo
        title={tag.title}
        description={tag.title}
        openGraph={{
          title: tag.title,
          description: tag.title,
          type: "article",
        }}
      />
    </Layout>
  );
};

export default TagPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getPosts();
  const paths = [];
  const map = new Map<string, number>();
  posts.forEach((post, index) => {
    post.data.tags.forEach((t) => {
      const tagNum = map.get(t) ? map.get(post.data.category) + 1 : 1;
      map.set(t, tagNum);
      if (tagNum % blogConfig.article.articlesPerPage === 0) {
        paths.push({
          params: {
            id: `${tagNum / blogConfig.article.articlesPerPage + 1}`,
            tagId: t,
          },
        });
      }
    });
  });
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { tagId, id } = params;
  const tag = blogConfig.tags.find((c) => c.id === tagId);
  const current = parseInt(id as string, 10) - 1;
  try {
    const posts = getPosts();
    const filteredPosts = posts
      .filter(({ data }) => {
        return data.tags.some((t) => t === tag.id);
      })
      .sort((postA, postB) => {
        if (postA.data.date > postB.data.date) {
          return -1;
        }
        return 1;
      });

    const slicedPosts = filteredPosts
      .slice(
        current * blogConfig.article.articlesPerPage,
        current * blogConfig.article.articlesPerPage +
          blogConfig.article.articlesPerPage
      )
      .map((p) => {
        const { content, ...others } = p;
        return others;
      });

    return {
      props: {
        current: current + 1,
        max: Math.ceil(
          filteredPosts.length / blogConfig.article.articlesPerPage
        ),
        tag,
        posts: slicedPosts,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

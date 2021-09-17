import { NextSeo } from "next-seo";
import { Layout } from "@/components/layout";
import {
  ArticleWrapper,
  LatestArticle,
  ArticleLink,
  AritcleColumn,
} from "@/components/articles";
import { ArticleCard } from "@/components/articles/card";
import { Title } from "@/components/texts";
import { getPosts } from "@/utils/get-posts";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Entry, Tag } from "@/types";
import blogConfig from "@/blog.config";
import { LinkButton } from "@/components/buttons";

type Props = {
  tag: Tag;
  posts: Entry[];
  max: number;
};

const TagIndex: NextPage<Props> = (props) => {
  const { tag, posts, max } = props;

  return (
    <Layout>
      <div className="tag">
        <Title>{tag.title}</Title>
      </div>
      <ArticleWrapper>
        <LatestArticle>
          {posts.map((post) => (
            <AritcleColumn key={post.slug} column={3}>
              <ArticleLink href={`/${post.data.category}/${post.slug}`}>
                <ArticleCard entry={post.data} />
              </ArticleLink>
            </AritcleColumn>
          ))}
        </LatestArticle>
      </ArticleWrapper>
      <div className="link-button-wrap">
        {max > 1 && (
          <LinkButton href={`/tags/${tag.id}/page/2`}>Read More</LinkButton>
        )}
      </div>
      <NextSeo
        title={tag.title}
        description={`${tag.title}`}
        openGraph={{
          title: tag.title,
          description: `${tag.title}`,
          type: "article",
        }}
      />
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
    </Layout>
  );
};

export default TagIndex;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = blogConfig.tags.map(({ id }) => ({
    params: {
      tagId: id,
    },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { tagId } = params;
  const tag = blogConfig.tags.find((c) => c.id === tagId);
  try {
    const posts = getPosts();
    const filteredPosts = posts.filter(({ data }) => {
      return data.tags.some((t) => t === tag.id);
    });

    const slicedPosts = filteredPosts
      .slice(0, blogConfig.article.articlesPerPage)
      .map((p) => {
        const { content, ...others } = p;
        return others;
      });

    return {
      props: {
        tag,
        max: Math.ceil(
          filteredPosts.length / blogConfig.article.articlesPerPage
        ),
        posts: slicedPosts,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

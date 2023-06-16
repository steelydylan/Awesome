import blogConfig from "@/blog.config";
import { LinkButton } from "../buttons";
import { Layout } from "../layout";

export const NotFound = () => {
  return (
    <Layout>
      <div className="inner">
        <div className="row">
          <h1 className="title">{blogConfig.notFoundPage.title}</h1>
        </div>
        <div className="row">
          <p className="notfound-text">{blogConfig.notFoundPage.subtitle}</p>
        </div>
        <div className="row">
          <img
            className="notfound-image"
            src={blogConfig.notFoundPage.image}
            width="320"
            height="176"
            alt="404"
          />
        </div>
        <div className="row">
          <div className="notfound-desc">
            {blogConfig.notFoundPage.description}
          </div>
        </div>
        <div className="row">
          <LinkButton href="/">Home</LinkButton>
        </div>
        <style jsx>
          {`
            .inner {
              margin: 50px auto;
              max-width: 540px;
            }

            .row {
              display: flex;
              justify-content: center;
              flex-wrap: nowrap;
            }

            .notfound-text {
              font-size: var(--text-xl);
              font-weight: 600;
              text-align: center;
              line-height: 1.7;
              @media screen and (max-width: ${blogConfig.styles.breakPoints
                  .medium}) {
                font-size: var(--text-lg);
                line-height: 1.4;
              }
            }

            .title {
              font-size: 106px;
              letter-spacing: 0.1em;
              line-height: 1.1;
              margin-bottom: 0;
              @media screen and (max-width: ${blogConfig.styles.breakPoints
                  .medium}) {
                font-size: 50px;
              }
            }

            .notfound-image {
              max-width: 100%;
              height: auto;
              margin-bottom: 30px;
            }

            .notfound-desc {
              text-align: left;
              font-size: 0.95rem;
              color: var(--c-text-gray-lighter);
              line-height: 1.5;
              margin-bottom: 50px;
            }
          `}
        </style>
      </div>
    </Layout>
  );
};

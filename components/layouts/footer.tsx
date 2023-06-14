import blogConfig from "@/blog.config";
import { CategoryList } from "../common/category-list";
import { SocialList } from "../common/social-list";
import { TagList } from "../common/tag-list";
import { SubTitle } from "../texts";

export const Footer: React.VFC = () => {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-column">
          <img
            loading="lazy"
            src={blogConfig.siteLogo.url}
            className="footer-logo"
            alt="logo"
            width={blogConfig.siteLogo.width}
            height={blogConfig.siteLogo.height}
          />
          <p className="footer-description">{blogConfig.footer.title}</p>
          <div className="social-wrap">
            <SocialList />
          </div>
        </div>
        <div className="footer-column">
          <CategoryList />
        </div>
        <div className="footer-column">
          <SubTitle>{blogConfig.widgets.tagList.title}</SubTitle>
          <TagList tags={blogConfig.tags} />
        </div>
      </div>
      <p className="copyright">
        Copyright &copy; {new Date().getFullYear()} {blogConfig.siteName} All
        rights reserved.
      </p>
      <style jsx>
        {`
          .footer {
            margin-top: 100px;
            padding: 50px 10px;
            background-color: var(--c-base);
          }
          .footer-columns {
            display: flex;
            max-width: calc(var(--container-width) + 20px);
            margin: 0 auto;
            @media screen and (max-width: ${blogConfig.styles.breakPoints
                .medium}) {
              display: block;
            }
          }
          .footer-column {
            flex: 1;
            padding: 0 10px;
          }
          .social-wrap {
            margin-top: 10px;
            margin-bottom: 30px;
          }
          .copyright {
            font-size: 14px;
            text-align: center;
          }
        `}
      </style>
    </footer>
  );
};

import blogConfig from "@/blog.config";
import { SocialList } from "../common/social-list";

export const Profile = () => {
  return (
    <div className="profile">
      <div className="profile-inner">
        <div className="profile-img-wrap">
          <div className="profile-img">
            <img
              loading="lazy"
              src={blogConfig.account.image}
              width="130"
              height="130"
              alt="avatar"
            />
          </div>
        </div>
        <p className="profile-subtitle">PROFILE</p>
        <p className="profile-name">{blogConfig.account.name}</p>
        <div className="social-list-wrap">
          <SocialList />
        </div>
        <div className="profile-content">{blogConfig.account.description}</div>
      </div>
      <style jsx>
        {`
          .profile {
            margin: 70px 0 2.5em;
            background: ${blogConfig.styles.colors.bg};
            font-size: 0.98em;
            border-radius: 10px;
          }
          .profile-inner {
            padding: 30px;
          }
          .profile-img {
            position: relative;
            width: 130px;
            height: 130px;
            margin: 0 auto;
          }
          .profile-img :global(img) {
            border: solid 3px #fff;
            border-radius: 65px;
            overflow: hidden;
            object-fit: cover;
          }
          .profile-img-wrap {
            transform: translateY(-65px);
            margin-bottom: -65px;
          }
          .profile-subtitle {
            font-size: 13px;
            font-weight: bold;
            color: var(--c-text-gray-lighter);
            text-align: center;
            margin-bottom: 5px;
          }
          .profile-name {
            margin-top: 0;
            font-size: var(--text-lg);
            font-weight: bold;
            text-align: center;
          }
          .profile-content {
            font-size: var(--text-md);
            line-height: 1.7;
          }
          .social-list-wrap {
            margin-bottom: 30px;
            display: flex;
            justify-content: center;
          }
        `}
      </style>
    </div>
  );
};

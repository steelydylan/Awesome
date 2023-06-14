import blogConfig from "@/blog.config";

export function CategoryHero({
  title,
  image,
  description,
}: {
  title: string;
  image: string;
  description: string;
}) {
  return (
    <div className="category-hero">
      <img src={image} alt="" className="category-hero-img" />
      <div className="category-content">
        <h2 className="category-title fadein">{title}</h2>
        <p className="category-description fadein">{description}</p>
      </div>
      <style jsx>
        {`
          .category-hero {
            width: 100%;
            height: 0;
            padding-bottom: 25%;
            position: relative;
            border-radius: 25px;
            overflow: hidden;
            margin-bottom: 50px;
            @media screen and (max-width: ${blogConfig.styles.breakPoints
                .medium}) {
              height: auto;
              padding-bottom: 0;
              margin-right: -10px;
              margin-left: -10px;
              width: calc(100% + 20px);
              border-radius: 0;
              margin-top: -32px;
            }
          }
          .category-hero-img {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            object-fit: cover;
          }
          .category-content {
            background-color: rgba(0, 0, 0, 0.3);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            @media screen and (max-width: ${blogConfig.styles.breakPoints
                .medium}) {
              padding-top: 25px;
              padding-bottom: 25px;
              position: relative;
            }
          }
          .category-title {
            text-transform: uppercase;
            font-size: 24px;
            color: #fff;
          }
          .category-description {
            font-size: 14px;
            color: #fff;
          }
        `}
      </style>
    </div>
  );
}

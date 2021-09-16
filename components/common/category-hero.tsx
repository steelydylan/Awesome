import blogConfig from "@/blog.config";
import Image from "next/image";

export const CategoryHero: React.FC<{
  title: string;
  image: string;
  description: string;
}> = ({ title, image, description }) => {
  return (
    <div className="category-hero">
      <Image src={image} alt="" layout="fill" className="category-hero-img" />
      <div className="category-content">
        <h2 className="category-title">{title}</h2>
        <p className="category-description">{description}</p>
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
            @media screen and (max-width: ${blogConfig.styles.breakPoints.medium}) {
              margin-right: -10px;
              margin-left: -10px;
              width: calc(100% + 20px);
              border-radius: 0;
              margin-top: -32px;
            }
          }
          .category-hero :global(.category-hero-img) {
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
};

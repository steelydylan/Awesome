export const CategoryHero: React.FC<{
  title: string;
  image: string;
  description: string;
}> = ({ title, image, description }) => {
  return (
    <div className="category-hero">
      <img src={image} alt="" />
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
          }
          .category-hero img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
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

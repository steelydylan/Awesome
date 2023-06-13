import blogConfig from "@/blog.config";
import dayjs from "dayjs";

export function Title({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="title fadein">
      {children}
      <style jsx>
        {`
          .title {
            font-size: var(--text-xl);
            font-weight: 600;
            padding: 12px 0;
            text-align: center;
            margin-bottom: 40px;
            @media screen and (max-width: ${blogConfig.styles.breakPoints
                .medium}) {
              margin-bottom: 20px;
            }
          }
          .title:after {
            content: "";
            height: 3px;
            width: 35px;
            margin: 0 auto;
            border-radius: 1.5px;
            display: block;
            margin-top: 5px;
            background: var(--c-primary-gradient);
          }
        `}
      </style>
    </h2>
  );
}

export function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="subtitle">
      {children}
      <style jsx>
        {`
          .subtitle {
            font-size: var(--text - md);
            font-weight: 600;
            padding: 12px 0;
          }
          .subtitle:after {
            content: "";
            height: 3px;
            width: 35px;
            border-radius: 1.5px;
            display: block;
            margin-top: 5px;
            background: var(--c-primary-gradient);
          }
        `}
      </style>
    </h3>
  );
}

type DateProps = {
  date: string;
  className?: string;
};

export const Date: React.VFC<DateProps> = ({ date, className }) => (
  <time className={className}>{dayjs(date).format("YYYY-MM-DD")}</time>
);

import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import { Fragment } from "react";

export const Text = ({
  text: sourceText,
}: {
  text: RichTextItemResponse[];
}) => {
  if (!sourceText) {
    return null;
  }
  return (
    <>
      {sourceText.map((value) => {
        const {
          annotations: { bold, code, color, italic, strikethrough, underline },
          plain_text: text,
          href,
        } = value;
        return (
          <span
            className={[
              bold ? "font-bold" : "",
              code
                ? "text-white bg-black bg-opacity-80 text-sm inline-block py px-1 rounded-sm mx-1 my-1"
                : "",
              italic ? "italic" : "",
              strikethrough ? "stroke-1" : "",
              underline ? "underline" : "",
            ].join(" ")}
            style={color !== "default" ? { color } : {}}
          >
            {href ? (
              <a href={href} className="text-indigo-500 hover:underline">
                {text}
              </a>
            ) : (
              text
            )}
          </span>
        );
      })}
    </>
  );
};

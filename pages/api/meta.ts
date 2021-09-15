import { NextApiRequest, NextApiResponse } from "next";
import got from "got";
import metascraperInit from "metascraper";
import description from "metascraper-description";
import image from "metascraper-image";
import title from "metascraper-title";

const metascraper = metascraperInit([description(), image(), title()]);

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== "GET") {
    return response.json({
      status: "failed",
    });
  }
  const { url: targetUrl } = request.query;
  const { body: html, url } = await got(targetUrl as string);
  const data = await metascraper({ html, url });
  return response.json({
    status: "success",
    data,
  });
};

import { NextApiRequest, NextApiResponse } from "next";
import Mailchimp from "mailchimp-api-v3";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== "POST") {
    return response.json({
      status: "failed",
    });
  }
  const mailchimp = new Mailchimp(process.env.MAILCHIMP_APIKEY);
  try {
    const result = await mailchimp.post(
      `/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members`,
      {
        email_address: request.body.email,
        status: "subscribed",
      }
    );
    return response.status(200).json({ status: result.status });
  } catch (err) {
    const { statusCode, errors, title, detail } = err;
    if (title === "Member Exists") {
      return response.status(409).json({ title, detail, errors });
    }
    return response.status(statusCode).json({ title, detail, errors });
  }
};

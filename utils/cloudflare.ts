import S3 from "aws-sdk/clients/s3.js";
import fs from "fs";
import https from "https";

const fileTypeFromFile = (path: string) => {
  const ext = path.split(".").pop();
  switch (ext) {
    case "md":
      return "text/markdown";
    case "json":
      return "application/json";
    case "js":
      return "text/javascript";
    case "css":
      return "text/css";
    case "html":
      return "text/html";
    case "png":
      return "image/png";
    case "jpeg":
      return "image/jpeg";
    case "jpg":
      return "image/jpeg";
    case "webp":
      return "image/webp";
    case "gif":
      return "image/gif";
    case "svg":
      return "image/svg+xml";
    case "mp4":
      return "video/mp4";
  }
};

const buildS3 = () => {
  const endpoint = `https://${process.env.CLOUD_FLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`;
  return new S3({
    endpoint,
    accessKeyId: process.env.CLOUD_FLARE_ACCESS_KEY,
    secretAccessKey: process.env.CLOUD_FLARE_SECRET_KEY,
    ...(process.env.BUCKET_LOCAL
      ? {
          s3ForcePathStyle: true,
          sslEnabled: false,
        }
      : {
          signatureVersion: "v4",
        }),
  });
};

export const uploadToR2 = async (path, destination) => {
  const s3 = buildS3();
  // await purgeCache(destination)
  return new Promise((resolve, reject) => {
    https.get(path, async (res) => {
      const data = await s3
        .upload(
          {
            Bucket: process.env.CLOUD_FLARE_BUCKET,
            Key: destination,
            Body: res,
            ContentType: fileTypeFromFile(path),
          },
          (err, data) => {
            if (err) {
              console.log(err);
            }
            console.log(data);
          }
        )
        .promise();
      resolve(data);
    });
  });
};

import sizeOf from "image-size";

export const fetchImageAsBlob = async (url: string) => {
  try {
    return await fetch(url).then((res) => res.blob());
  } catch (err) {
    return null;
  }
};

export const getImageSize = async (blob: Blob) => {
  if (!blob) {
    return;
  }

  const binary = (await blob.arrayBuffer()) as Uint8Array;
  const buffer = Buffer.from(binary);

  return sizeOf(buffer);
};

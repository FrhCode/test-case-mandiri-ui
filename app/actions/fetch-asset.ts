"use server";
import generateHeaders from "@/helper/generate-request-headers";

const fetchAsset = async (path: string): Promise<string> => {
  const headers = await generateHeaders();
  const res = await fetch(process.env.API_URL + path, {
    cache: "no-cache",
    headers,
  });

  if (!res.ok) {
    throw new Error(res.statusText || "Failed to fetch asset");
  }

  const buffer = await res.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");
  const mimeType =
    res.headers.get("content-type") || "application/octet-stream";
  const dataUrl = `data:${mimeType};base64,${base64}`;

  return dataUrl;
};

export default fetchAsset;

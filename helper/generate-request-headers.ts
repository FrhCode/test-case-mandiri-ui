import { auth } from "./auth";

const generateHeaders = async () => {
  const session = await auth();
  const token = session?.user.access_token;

  const headers = new Headers();
  // headers.append("Content-Type", "multipart/form-data");
  headers.append("Authorization", `Bearer ${token}`);
  return headers;
};

export default generateHeaders;

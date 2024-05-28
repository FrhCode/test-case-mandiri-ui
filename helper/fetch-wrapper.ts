import generateHeaders from "./generate-request-headers";
import handleResponse from "./handle-response";

const get = async <T>(url: string) => {
  const headers = await generateHeaders();

  const path = `${process.env.NEXT_PUBLIC_API_URL}${url}`;

  try {
    const response = await fetch(path, {
      method: "GET",
      headers,
      cache: "no-cache",
    });

    return await handleResponse<T>(response);
  } catch (e) {
    throw new Error("Internal Server Error");
  }
};

const post = async <T>(url: string, body: FormData) => {
  const headers = await generateHeaders();

  const path = `${process.env.NEXT_PUBLIC_API_URL}${url}`;

  try {
    console.log("before response");
    const response = await fetch(path, {
      method: "POST",
      headers,
      body,
    });

    return await handleResponse<T>(response);
  } catch (e) {
    console.log(e);
    return { error: { status: 500, message: "Internal Server Error" } };
  }
};

const put = async <T>(url: string, body: FormData) => {
  const headers = await generateHeaders();

  const path = `${process.env.NEXT_PUBLIC_API_URL}${url}`;

  try {
    console.log("before response");
    const response = await fetch(path, {
      method: "PUT",
      headers,
      body,
    });

    return await handleResponse<T>(response);
  } catch (e) {
    console.log(e);
    return { error: { status: 500, message: "Internal Server Error" } };
  }
};

const fetchWrapper = {
  get,
  post,
  put,
};

export default fetchWrapper;

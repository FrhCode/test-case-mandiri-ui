import SuccessResponse from "@/types/success-response";
import { auth } from "./auth";
import ErrorResponse from "@/types/error-response";
import generateFormData from "./generate-form-data";

const handleResponse = async <T>(
  response: Response,
): Promise<SuccessResponse<T> | ErrorResponse> => {
  const text = await response.text();
  const data = (text && JSON.parse(text)) as T;

  if (response.ok) {
    return { data, error: null };
  } else {
    return {
      error: {
        status: response.status,
        message: response.statusText,
      },
      data: null,
    };
  }
};

const generateHeaders = async () => {
  const session = await auth();
  const token = session?.user.id_token;

  const headers = new Headers();
  headers.append("Content-Type", "multipart/form-data");
  headers.append("Authorization", `Bearer ${token}`);
  return headers;
};

const get = async <T>(url: string) => {
  const headers = await generateHeaders();

  const path = `${process.env.API_URL}${url}`;

  const response = await fetch(path, {
    method: "GET",
    headers,
    cache: "no-cache",
  });

  return await handleResponse<T>(response);
};

const post = async (url: string, body: Record<string, any>) => {
  const headers = await generateHeaders();

  const path = `${process.env.NEXT_PUBLIC_API_URL}${url}`;

  const formData = generateFormData(body);

  const response = await fetch(path, {
    method: "POST",
    headers,
    body: formData,
  });

  return await handleResponse(response);
};

const fetchWrapper = {
  get,
};

export default fetchWrapper;

import ErrorResponse from "@/types/error-response";
import SuccessResponse from "@/types/success-response";

const handleResponse = async <T>(
  response: Response,
): Promise<SuccessResponse<T> | ErrorResponse> => {
  const text = await response.text();

  if (response.ok) {
    const data = (text && JSON.parse(text)) as T;
    return { data };
  } else {
    const data = text;

    return {
      error: {
        status: response.status,
        message: response.statusText,
      },
    };
  }
};

export default handleResponse;

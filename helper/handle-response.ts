import ErrorResponse from "@/types/error-response";
import SuccessResponse from "@/types/success-response";

const handleResponse = async <T>(
  response: Response,
): Promise<SuccessResponse<T> | ErrorResponse> => {
  const text = await response.text();
  const data = (text && JSON.parse(text)) as T;

  if (response.ok) {
    return { data };
  } else {
    console.log("response", data);

    return {
      error: {
        status: response.status,
        message: response.statusText,
      },
    };
  }
};

export default handleResponse;

import { addToast } from "@heroui/react";
import { isAxiosError } from "axios";

interface ApiErrorResponse {
  meta: {
    message: string;
    // Mungkin ada properti lain seperti code, status, dll.
  };
  // Mungkin ada properti data lain
}

export const errorResponse = (errors: Error) => {
  console.log(errors);
  let errorMessage = "Something went wrong";
  if (isAxiosError<ApiErrorResponse>(errors)) {
    const apiMessage = errors.response?.data?.meta?.message;
    if (apiMessage) {
      errorMessage = apiMessage;
    }
  } else if (errors instanceof Error) {
    errorMessage = errors.message;
  }

  addToast({
    title: "Error",
    description: errorMessage,
    color: "danger",
  });
};

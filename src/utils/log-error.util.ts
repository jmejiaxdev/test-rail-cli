import { isAxiosError } from "axios";

export default function logError(placeholder: string, error: any): void {
  let formattedError = error;

  if (isAxiosError(error)) {
    formattedError = {
      config: {
        headers: error.config?.headers,
        baseURL: error.config?.baseURL,
        method: error.config?.method,
        url: error.config?.url,
        data: error.config?.data,
      },
      status: error.response?.status,
      statusText: error.response?.statusText,
    };
  }

  console.error(placeholder, formattedError);
}

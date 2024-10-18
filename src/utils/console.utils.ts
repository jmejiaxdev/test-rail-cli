import { isAxiosError } from "axios";
import { ANSIColor } from "../definitions/color.definitions";
import { rl } from "../definitions/read-line.definitions";

const logTestCaseStatus = (status: string, id: string, title: string): void => {
  const statusColor = {
    created: ANSIColor.Green,
    deleted: ANSIColor.Red,
    unchanged: ANSIColor.Yellow,
    markAsDeleted: ANSIColor.Orange,
  }[status];

  console.log(statusColor, `- (${status.toUpperCase()}) Test case: ${id}: ${title}`);
};

const logError = (placeholder: string, error: any): void => {
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

  console.error(ANSIColor.Red, placeholder, formattedError);
};

const getInput = async (prompt: string): Promise<string> => {
  return new Promise((resolve) => rl.question(prompt, (input) => resolve(input)));
};

const consoleUtils = {
  getInput,
  logError,
  logTestCaseStatus,
};

export default consoleUtils;

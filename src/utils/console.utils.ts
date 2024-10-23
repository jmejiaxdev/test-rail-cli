import { isAxiosError } from "axios";
import { TestCaseDescription } from "../definitions/test-case.definitions";
import { ANSIColor, Rl, Status } from "../definitions/console.definitions";

const logTestCaseDescription = (status: Status, testCaseDescription: TestCaseDescription): void => {
  const { id, title } = testCaseDescription;

  const statusColor = {
    added: ANSIColor.Green,
    updated: ANSIColor.Yellow,
    markAsDeleted: ANSIColor.Orange,
    deleted: ANSIColor.Red,
  }[status];

  console.log(statusColor, `${status.toUpperCase()} || ${id} || ${title}`);
};

const logError = (error: any, placeholder: string = ""): void => {
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
  return new Promise((resolve) => Rl.question(prompt, (input) => resolve(input)));
};

const ConsoleUtils = {
  getInput,
  logError,
  logTestCaseDescription,
};

export default ConsoleUtils;

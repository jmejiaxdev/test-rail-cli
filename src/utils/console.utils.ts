import { ANSIColor } from "../definitions/color.definitions";
import { rl } from "../definitions/read-line.definitions";

const askQuestion = (query: string): Promise<string> => {
  return new Promise((resolve) => rl.question(query, (answer) => resolve(answer)));
};

const confirmTestCasesDeletion = async (testCases: any[], filePath: string): Promise<string> => {
  const message = `The following TestRail test cases were found in TestRail but not in the file "${filePath}". If you are certain they don't belong to another file and wish to mark them as deleted in TestRails, type "delete" to confirm:\n`;
  console.log(message);

  testCases.forEach((testCase) => logTestCaseStatus("notFound", testCase.id, testCase.title));

  return await askQuestion(`Type "delete" to confirm deletion: `);
};

const logTestCaseStatus = (status: string, id: string, title: string): void => {
  const statusColor = {
    unchanged: ANSIColor.Yellow,
    created: ANSIColor.Green,
    deleted: ANSIColor.Red,
    notFound: ANSIColor.Red,
  }[status];

  console.log(statusColor, `- (${status.toUpperCase()}) Test case: ${id}: ${title}`);
};

const consoleUtils = {
  askQuestion,
  confirmTestCasesDeletion,
  logTestCaseStatus,
};

export default consoleUtils;

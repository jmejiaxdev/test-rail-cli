import fs from "fs";
import { Config } from "../definitions/config.definitions";
import ChatGPTService from "../services/chat-gpt.service";
import FileUtils from "../utils/file.utils";
import ConsoleUtils from "../utils/console.utils";

// Test me
const getTestsFileContent = (testCasesFilePath: string) =>
  FileUtils.hasFileExtension(testCasesFilePath, Config.testExtension) && testCasesFilePath
    ? FileUtils.getFileContent(testCasesFilePath)
    : FileUtils.createTestCasesFile(testCasesFilePath);

export default async function handler() {
  console.log("\nCreate new test cases using ChatGPT\n");

  try {
    const codeFilePath = await FileUtils.getFilePath("Enter the file path: ");
    const codeFileContent = FileUtils.getFileContent(codeFilePath);
    const testCasesFilePath = await FileUtils.getFilePath("Enter the test cases file path (or empty to create one): ");
    const testCasesFileContent = getTestsFileContent(testCasesFilePath);
    const newTestCasesContent = await ChatGPTService.createTestCasesContent(codeFileContent, testCasesFileContent);
    const testCasesContent = newTestCasesContent
      ? `${testCasesFileContent}\n\n${newTestCasesContent}`
      : testCasesFileContent;

    fs.writeFileSync(testCasesFilePath, testCasesContent, "utf8");
    console.log(`Test cases file ${testCasesFilePath} updated with ${newTestCasesContent?.length} new test cases`);
  } catch (err) {
    ConsoleUtils.logError(err);
  }
}

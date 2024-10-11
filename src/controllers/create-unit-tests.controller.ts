import * as fs from "fs";
import * as path from "path";
import getFiles from "../utils/get-files.util";
import logError from "../utils/log-error.util";
import getUnitTestsFromChatGPT from "../utils/get-unit-test-from-chat-gpt.util";
import extractTestCases from "../utils/extract-test-cases.util";
import addTestRailCase from "../api/add-test-rail-case.api";
import { TestCase } from "../definitions/test-case.definition";
import toTestCase from "../utils/to-test-case.util";

const dirPath = process.env.DIR_PATH || "";

const addUnitTestsToTestRails = async (filePath: string): Promise<string | undefined> => {
  const fileContent = fs.readFileSync(filePath, "utf8");

  const testCases = extractTestCases(fileContent);
  if (!testCases.length) {
    console.warn("No test cases found", filePath);
    return;
  }

  let updatedContent;

  for (const testCase of testCases) {
    console.log("Updating test case:", testCase);

    if (testCase?.id) {
      console.log("Test already exists in TestRails", testCase);
      return;
    }

    try {
      const testRailCase = await addTestRailCase(testCase.title);
      if (!testRailCase) {
        console.log("Unable to create test rails case:", testCase);
        break;
      }

      updatedContent = toTestCase(fileContent, testRailCase.data as TestCase, testCase.title || "");
    } catch (error: any) {
      logError("Updating test case error", error);
    }
  }

  return updatedContent;
};

export default async function createUnitTests() {
  if (!dirPath) {
    console.error("Directory path is not defined");
    return;
  }

  const files = getFiles(dirPath);

  for (const file of files) {
    console.log("Creating unit test:", file);

    try {
      let fileContent = fs.readFileSync(file.path, "utf8");

      const unitTests = await getUnitTestsFromChatGPT(fileContent);
      if (!unitTests) {
        console.warn("Unable to fetch unit test from ChatGPT:", fileContent);
        break;
      }

      const testFileName = file.name.replace(/\.ts(x)?$/, ".test.ts");
      const testFilePath = path.join(path.dirname(file.path), testFileName);

      const testRailsUnitTests = await addUnitTestsToTestRails(testFilePath);
      if (!testRailsUnitTests) {
        console.warn("Unable to add unit test to Test Rails:", testFilePath);
        break;
      }

      // FIXME if file already exist, add new content.
      fs.writeFileSync(testFilePath, testRailsUnitTests);
      console.log("Unit test created:", testFilePath, testFileName);
    } catch (error) {
      logError("Creating unit test error", error);
    }
  }
}

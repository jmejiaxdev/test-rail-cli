import * as fs from "fs";
import addTestRailCase from "../api/add-test-rail-case.api";
import { TestCase } from "../definitions/test-case.definition";
import extractTestCases from "../utils/extract-test-cases.util";
import getTestFilesPaths from "../utils/get-test-files-paths.util";
import logError from "../utils/log-error.util";
import toGherkin from "../utils/to-gherkin.util";
import toTestCase from "../utils/to-test-case.util";

const dirPath = process.env.DIR_PATH;

const addTestCases = async (fileContent: string, testCases: TestCase[]): Promise<string | undefined> => {
  let updatedContent;

  // You might be tempted to use an array prototype (e.g forEach), but they don't wait for asynchronous
  // operations inside their callback to complete before moving on to the next iteration or finishing execution.
  // Even if you're using await inside the loop, the prototype itself doesn't pause. This means the
  // loop finishes iterating and executes before any of the await calls within the loop have resolved.
  for (const testCase of testCases) {
    console.log("Updating test case:", testCase);

    if (testCase?.id) {
      console.log("Test already exists in TestRails", testCase);
      break;
    }

    try {
      const gherkinTitle = await toGherkin(testCase.title);
      if (!gherkinTitle) {
        console.warn("Unable to convert current test to Gherkin", testCase.title);
        break;
      }

      const createResponse = await addTestRailCase(gherkinTitle);
      console.log("Test case created:", createResponse.data);

      updatedContent = toTestCase(fileContent, createResponse.data as TestCase, gherkinTitle);
    } catch (error: any) {
      logError("Updating test case error", error);
    }
  }

  return updatedContent;
};

export default async function updateTestFiles(): Promise<void> {
  const filesPaths = await getTestFilesPaths(dirPath);

  // You might be tempted to use an array prototype (e.g forEach), but they don't wait for asynchronous
  // operations inside their callback to complete before moving on to the next iteration or finishing execution.
  // Even if you're using await inside the loop, the prototype itself doesn't pause. This means the
  // loop finishes iterating and executes before any of the await calls within the loop have resolved.
  for (const filePath of filesPaths) {
    console.log("Updating test file:", filePath);

    try {
      let fileContent = fs.readFileSync(filePath, "utf8");

      const testCases = extractTestCases(fileContent);
      if (!testCases.length) {
        console.warn("No test cases found", filePath);
        break;
      }

      const updatedTestCases = await addTestCases(fileContent, testCases);
      if (!updatedTestCases) {
        console.warn("Unable to update test file", filePath);
        break;
      }

      fs.writeFileSync(filePath, updatedTestCases, "utf8");
    } catch (error) {
      logError("Updating test file error", error);
    }
  }
}

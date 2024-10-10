import "dotenv/config";
import * as fs from "fs";
import { TestCase } from "./definitions/test-case.definition";
// import transformToGherkin from "./utils/transform-to-gherkin.util";
import upsertTestCase from "./controllers/upsert-test-case.controller";
import extractTestCases from "./utils/extract-test-cases.util";
import getTestFilesPaths from "./utils/get-test-files-paths.util";
import logError from "./utils/log-error.util";
import toTestCase from "./utils/to-test-case.util";

const dirPath = process.env.DIR_PATH;

const updateTestCases = async (fileContent: string, testCases: TestCase[]): Promise<string | undefined> => {
  let updatedContent;

  // You might be tempted to use forEach prototype, but forEach doesn't wait for asynchronous operations
  // inside its callback to complete before moving on to the next iteration or finishing execution. Even
  // if you're using await inside the loop, forEach itself doesn't pause. This means the loop finishes
  // iterating and executes before any of the await calls within the loop have resolved.
  for (const testCase of testCases) {
    console.log("Updating test case", testCase);

    try {
      // FIXME: add conditional for OpenAI
      // const gherkinTitle = await transformToGherkin(test.description);
      const gherkinTitle = testCase.title;
      if (!gherkinTitle) {
        console.warn("Unable to convert current test to Gherkin", testCase.title);
        return;
      }

      const testRailsCase = await upsertTestCase(gherkinTitle, testCase.id);
      if (!testRailsCase || !testRailsCase?.id) {
        console.warn("Unable to upsert TestRails case", testCase.title);
        return;
      }

      updatedContent = toTestCase(fileContent, testRailsCase, gherkinTitle);
    } catch (error: any) {
      logError("Updating test case error", error);
    }
  }

  return updatedContent;
};

const updateTestFiles = async () => {
  const filesPaths = await getTestFilesPaths(dirPath);

  // You might be tempted to use forEach prototype, but forEach doesn't wait for asynchronous operations
  // inside its callback to complete before moving on to the next iteration or finishing execution. Even
  // if you're using await inside the loop, forEach itself doesn't pause. This means the loop finishes
  // iterating and executes before any of the await calls within the loop have resolved.
  for (const filePath of filesPaths) {
    console.log("Updating test file", filePath);

    try {
      let fileContent = fs.readFileSync(filePath, "utf8");

      const testCases = extractTestCases(fileContent);
      if (!testCases.length) {
        console.warn("No test cases found", filePath);
        return;
      }

      const updatedTestCases = await updateTestCases(fileContent, testCases);
      if (!updatedTestCases) {
        console.warn("Unable to update test file", filePath);
        return;
      }

      console.log("filePath", filePath);
      console.log("updatedTestContent", updatedTestCases);
      fs.writeFileSync(filePath, updatedTestCases, "utf8");
    } catch (error) {
      logError("Updating test file error", error);
    }
  }
};

updateTestFiles();

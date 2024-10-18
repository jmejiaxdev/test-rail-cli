import fs from "fs";
import openAIAPI from "../api/open-ai.api";
import testRailsAPI from "../api/test-rails.api";
import { Description, TestCase } from "../definitions/test-case.definitions";
import consoleUtils from "../utils/console.utils";

const addUnitTests = async (descriptions: Description[], options: TestCase): Promise<TestCase[]> => {
  return await Promise.all(
    descriptions.map(async (description) => await testRailsAPI.addTestCase({ ...options, title: description.title }))
  );
};

const createUnitTests = async (codeFilePath: string, unitTestsFilePath: string): Promise<string | null> => {
  const code = fs.readFileSync(codeFilePath, "utf8");
  const unitTests = fs.readFileSync(unitTestsFilePath, "utf8");

  return await openAIAPI.getChatGPTResponse(
    `Given the following code: 
    ${code}

    And the following unit tests: ${unitTests}

    Generate missing unit tests in Jest, using Gherkin-style descriptions in the format "Given-When-Then". 
    Provide the code only, without any additional descriptions or text.`
  );
};

const extractUnitTestsDescriptions = (unitTests: string): Description[] => {
  // Regular expression to match test descriptions with an optional id at the start
  const testDescriptionRegex = /test\(['"`](\d+)?\s*:?\s*(.*)['"`],/g;

  const testDescriptions: Description[] = [];
  let match;

  while ((match = testDescriptionRegex.exec(unitTests)) !== null) {
    const id = match[1] || null;
    const title = match[2].trim();
    testDescriptions.push({ id, title });
  }

  return testDescriptions;
};

// rename function
const deleteTestCases = async (sectionId: string): Promise<TestCase[]> => {
  const testRailsTestCases = await testRailsAPI.getTestCases(sectionId);
  const testRailsTestCasesCount = testRailsTestCases.length;

  if (!testRailsTestCasesCount) return testRailsTestCases;

  // Soft delete test cases
  await Promise.all(
    testRailsTestCases.map(async (testCase) => {
      await testRailsAPI.updateTestCase(testCase.id, { custom_status_id: 6 });
      consoleUtils.logTestCaseStatus("markAsDeleted", testCase.id, testCase.title);
    })
  );

  const confirm = await consoleUtils.getInput(
    `${testRailsTestCasesCount} test cases were marked as deleted in TestRails. If you are certain they don't belong to another file and wish to delete them in TestRails, type "delete" to confirm:\n`
  );

  if (confirm === "delete") {
    await Promise.all(
      testRailsTestCases.map(async (testCase) => {
        await testRailsAPI.deleteTestCase(testCase.id);
        consoleUtils.logTestCaseStatus("deleted", testCase.id, testCase.title);
      })
    );
  }

  return testRailsTestCases;
};

const testCaseService = {
  addUnitTests,
  createUnitTests,
  deleteTestCases,
  extractUnitTestsDescriptions,
};

export default testCaseService;

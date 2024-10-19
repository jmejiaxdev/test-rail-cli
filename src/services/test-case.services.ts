import fs from "fs";
import OpenAIApi from "../api/open-ai.api";
import TestRailsApi from "../api/test-rails.api";
import { TestCase, TestCaseDescription } from "../definitions/test-case.definitions";
import ConsoleUtils from "../utils/console.utils";

const addTestCases = async (testCasesDescriptions: TestCaseDescription[], options: TestCase): Promise<TestCase[]> => {
  return await Promise.all(
    testCasesDescriptions.map(
      async (testCaseDescription) => await TestRailsApi.addTestCase({ ...options, title: testCaseDescription.title })
    )
  );
};

const createTestCases = async (codeFileContent: string, testCasesFileContent: string): Promise<string | null> => {
  // const response = await OpenAIAPI.getChatGPTResponse(`
  //   Given the following code:
  //   ${codeFileContent}

  //   And the following test cases:
  //   ${testCasesFileContent}

  //   Generate missing test cases in Jest. Use Gherkin-style descriptions
  //   in the format "[Given] scenario [When] condition [Then] expected", and "test" instead of "it".
  //   Provide the code only, without any additional descriptions or text.
  // `);
  const response = `\`\`\`javascript
  import sum from "./sum";
  
  describe("sum function", () => {
    test("[Given] two positive numbers [When] they are added [Then] the result should be their sum", () => {
      expect(sum(2, 3)).toBe(5);
    });
  
    test("[Given] a positive number and zero [When] they are added [Then] the result should be the positive number", () => {
      expect(sum(5, 0)).toBe(5);
    });
  
    test("[Given] two negative numbers [When] they are added [Then] the result should be their sum", () => {
      expect(sum(-2, -3)).toBe(-5);
    });
  });
  \`\`\``;

  // Use regular expressions to remove the markdown code block markers
  return response && response.replace(/```javascript|```/g, "").trim();
};

const extractTestCasesDescriptions = (fileContent: string): TestCaseDescription[] => {
  let match;
  // Regular expression to match test descriptions with an optional id at the start
  const testDescriptionRegex = /test\(['"`](\d+)?\s*:?\s*(.*)['"`],/g;
  const testDescriptions: TestCaseDescription[] = [];

  while ((match = testDescriptionRegex.exec(fileContent)) !== null) {
    const id = match[1];
    const title = match[2].trim();
    testDescriptions.push({ id, title });
  }

  console.log(`Extracted test descriptions`, testDescriptions);
  return testDescriptions;
};

const deleteTestCases = async (testCases: TestCase[]): Promise<TestCase[]> => {
  // use this from caller
  // const testRailsTestCases = await testRailsAPI.getTestCases(sectionId);
  // const testRailsTestCasesCount = testRailsTestCases.length;
  // if (!testRailsTestCasesCount) return testRailsTestCases;

  // update TestCases services
  await Promise.all(
    testCases.map(async (testCase) => {
      await TestRailsApi.updateTestCase(testCase.id, { custom_status_id: 6 });
      ConsoleUtils.logTestCaseStatus("markAsDeleted", testCase);
    })
  );

  // Should move this to caller?
  const confirm = await ConsoleUtils.getInput(
    `${testCases.length} test cases were marked as deleted in TestRails. If you are certain they don't belong to another file and wish to delete them in TestRails, type "delete" to confirm:\n`
  );

  if (confirm === "delete") {
    // Create service for this this
    await Promise.all(
      testCases.map(async (testCase) => {
        await TestRailsApi.deleteTestCase(testCase.id);
        ConsoleUtils.logTestCaseStatus("deleted", testCase);
      })
    );
  }

  return testCases;
};

const getTestCases = async (sectionId: string): Promise<TestCase[]> => {
  return await TestRailsApi.getTestCases(sectionId);
};

const TestCaseService = {
  addTestCases,
  createTestCases,
  deleteTestCases,
  extractTestCasesDescriptions,
  getTestCases,
};

export default TestCaseService;

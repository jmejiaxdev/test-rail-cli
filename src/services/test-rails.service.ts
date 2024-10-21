import TestRailsApi from "../api/test-rails.api";
import { TestCase, TestCaseDescription } from "../definitions/test-case.definitions";
import ConsoleUtils from "../utils/console.utils";

const deleteTestCases = async (testCaseDescritions: TestCaseDescription[]) => {
  await Promise.all(
    testCaseDescritions.map(async (testCase) => {
      await TestRailsApi.deleteTestCase(testCase.id);
      ConsoleUtils.logTestCaseDescription("deleted", testCase);
    })
  );

  return testCaseDescritions.length;
};

const extractTestCasesDescriptions = (fileContent: string): TestCaseDescription[] => {
  console.log("Extracting test cases descriptions...");

  let match;
  // Regular expression to match test descriptions with an optional id at the start
  const testDescriptionRegex = /test\(['"`](\d+)?\s*:?\s*(.*)['"`],/g;
  const testDescriptions: TestCaseDescription[] = [];

  while ((match = testDescriptionRegex.exec(fileContent)) !== null) {
    const id = match[1];
    const title = match[2].trim();
    testDescriptions.push({ id, title });
  }

  console.log(`${testDescriptions} test cases descriptions`);
  return testDescriptions;
};

const getSuites = async () => TestRailsApi.getSuites();

const getTestCases = async (sectionId: string): Promise<TestCase[]> => {
  return await TestRailsApi.getTestCases(sectionId);
};

const markTestCasesAsDeleted = async (testCaseDescritions: TestCaseDescription[]) => {
  await Promise.all(
    testCaseDescritions.map(async (testCaseDescriptions) => {
      await TestRailsApi.updateTestCase(testCaseDescriptions.id, { custom_status_id: 6 });
      ConsoleUtils.logTestCaseDescription("markAsDeleted", testCaseDescriptions);
    })
  );

  return testCaseDescritions.length;
};

const saveTestCases = async (testCasesDescriptions: TestCaseDescription[], options: TestCase): Promise<TestCase[]> => {
  console.log("Saving test cases...");

  const testCasesSaved = await Promise.all(
    testCasesDescriptions.map(async (testCaseDescription) => {
      const testCase = { ...options, title: testCaseDescription.title };
      return testCaseDescription.id
        ? await TestRailsApi.updateTestCase(testCaseDescription.id, testCase)
        : await TestRailsApi.addTestCase(testCase);
    })
  );

  console.log(`${testCasesSaved.length} test cases saved`);
  return testCasesSaved;
};

const TestRailsService = {
  deleteTestCases,
  extractTestCasesDescriptions,
  getSuites,
  getTestCases,
  markTestCasesAsDeleted,
  saveTestCases,
};

export default TestRailsService;

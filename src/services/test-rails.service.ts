import TestRailsApi from "../api/test-rails.api";
import { SaveTestCases, TestCase, TestCaseDescription } from "../definitions/test-case.definitions";
import ConsoleUtils from "../utils/console.utils";

const deleteTestCases = async (testCaseDescritions: TestCaseDescription[]) => {
  console.log("Deleting test cases in TestRails...");

  for (const testCase of testCaseDescritions) {
    await TestRailsApi.deleteTestCase(testCase.id);
    ConsoleUtils.logTestCaseDescription("deleted", testCase);
  }

  if (testCaseDescritions.length) console.log(`${testCaseDescritions.length} test cases deleted in TestRails`);

  return testCaseDescritions.length;
};

const extractTestCasesDescriptions = (fileContent: string): TestCaseDescription[] => {
  console.log("Extracting test cases descriptions...");

  let match;
  // Regular expression to match test descriptions with an optional id at the start
  const descriptionRegex = /test\(['"`](\d+)?\s*:?\s*(.*)['"`],/g;
  const testCaseDescriptions: TestCaseDescription[] = [];

  while ((match = descriptionRegex.exec(fileContent)) !== null) {
    const id = match[1];
    const title = match[2].trim();
    testCaseDescriptions.push({ id, title });
  }

  if (testCaseDescriptions.length) console.log(`${testCaseDescriptions.length} test cases descriptions extracted`);

  return testCaseDescriptions;
};

const getSuites = async () => {
  console.log("Getting test suites from TestRails...");

  const suites = await TestRailsApi.getSuites();

  suites.forEach((suite) => console.log(`${suite.id} || ${suite.name} || ${suite.url}`));
  if (suites.length) console.log(`${suites.length} in TestRails`);

  return suites;
};

const getTestCases = async (): Promise<TestCase[]> => {
  console.log("Getting test cases from TestRails...");

  const testCases = await TestRailsApi.getTestCases();

  testCases.forEach((testCase) => console.log(`${testCase.id} || ${testCase.title}`));
  if (testCases.length) console.log(`${testCases.length} test cases in TestRails`);

  return testCases;
};

// const markTestCasesAsDeleted = async (testCaseDescritions: TestCaseDescription[]) => {
//   for (const testCaseDescriptions of testCaseDescritions) {
//     await TestRailsApi.updateTestCase(testCaseDescriptions.id, { custom_status_id: CustomStatusId.MarkAsDeleted });
//     ConsoleUtils.logTestCaseDescription("markAsDeleted", testCaseDescriptions);
//   }

//   return testCaseDescritions.length;
// };

const saveTestCases = async (
  testCasesDescriptions: TestCaseDescription[],
  testCaseOptions: TestCase
): Promise<SaveTestCases> => {
  console.log("Saving test cases in TestRails...");

  const savedTestCases: SaveTestCases = { added: [], updated: [] };

  for (const testCaseDescription of testCasesDescriptions) {
    const testCase = { ...testCaseOptions, title: testCaseDescription.title };

    if (testCaseDescription.id) {
      const updatedTestCase = await TestRailsApi.updateTestCase(testCaseDescription.id, testCase);
      if (!updatedTestCase) continue;

      ConsoleUtils.logTestCaseDescription("updated", updatedTestCase);
      savedTestCases.updated.push(updatedTestCase);
    } else {
      const addedTestCase = await TestRailsApi.addTestCase(testCase);
      if (!addedTestCase) continue;

      ConsoleUtils.logTestCaseDescription("added", addedTestCase);
      savedTestCases.added.push(addedTestCase);
    }
  }

  console.log(`${savedTestCases.added.length} test cases added in TestRails`);
  console.log(`${savedTestCases.updated.length} test cases updated in TestRails`);

  return savedTestCases;
};

const TestRailsService = {
  deleteTestCases,
  extractTestCasesDescriptions,
  getSuites,
  getTestCases,
  // markTestCasesAsDeleted,
  saveTestCases,
};

export default TestRailsService;

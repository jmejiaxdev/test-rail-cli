import { Config } from "../definitions/config.definitions";
import { TestCase, TestCaseDescription } from "../definitions/test-case.definitions";
import TestRailsService from "../services/test-rails.service";
import FileUtils from "../utils/file.utils";
import ConsoleUtils from "../utils/console.utils";
import { Rl } from "../definitions/read-line.definitions";

const { section_id } = Config.testRails.testCase;

const getTestCasesFileContent = (testCasesFilePath: string) =>
  FileUtils.hasFileExtension(testCasesFilePath, Config.testExtension) &&
  testCasesFilePath &&
  FileUtils.getFileContent(testCasesFilePath);

const getMissingTestCasesDescriptions = async (
  testRailsTestCases: TestCase[],
  testCasesDescriptions: TestCaseDescription[]
): Promise<TestCaseDescription[]> => {
  const missingTestCases = testRailsTestCases.filter(
    (testRailsTestCase) =>
      !testCasesDescriptions.some((testCaseDescription) => testCaseDescription.id === testRailsTestCase.id)
  );

  if (!missingTestCases.length) return [];

  const includeMissingTestCases = await ConsoleUtils.getInput(
    `${missingTestCases.length} found in TestRails but not in our local test cases file. Would you like to delete them as well? (y/n)`
  );

  return includeMissingTestCases === "y"
    ? [...testCasesDescriptions, ...(missingTestCases as TestCaseDescription[])]
    : [];
};

// Review this case, the requirement doen't seems to be correct
// Should we update the file? or destroy it completely
// Should user review one by one what to delete?
export default async function handler(): Promise<void> {
  console.log(
    "Delete test cases in TestRails. Test cases without an ID will be omitted, while those with an existing ID will be deleted.\n"
  );

  try {
    const testCasesFilePath = await FileUtils.getFilePath("Enter the test cases file path: ");
    const testCasesFileContent = getTestCasesFileContent(testCasesFilePath) || "";
    const testRailsTestCases = await TestRailsService.getTestCases(section_id || "");
    const testCasesDescriptions = TestRailsService.extractTestCasesDescriptions(testCasesFileContent);
    const testCaseDescritionsToDelete = await getMissingTestCasesDescriptions(
      testRailsTestCases,
      testCasesDescriptions
    );

    const markedAsDeleted = TestRailsService.markTestCasesAsDeleted(testCaseDescritionsToDelete);

    const confirm = await ConsoleUtils.getInput(
      `${markedAsDeleted} test cases were marked as deleted in TestRails. If you are certain they don't belong to another file and wish to delete them in TestRails, type "delete" to confirm:\n`
    );

    if (confirm == "delete") {
      const deleted = TestRailsService.deleteTestCases(testCaseDescritionsToDelete);
      console.log(`${deleted} test cases were marked as deleted in TestRails`);
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    Rl.close();
  }
}

import fs from "fs";
import { TestCaseDescription } from "../definitions/test-case.definitions";
import TestRailsService from "../services/test-rails.service";
import FileUtils from "../utils/file.utils";
import ConsoleUtils from "../utils/console.utils";

const getMissingTests = async (testCasesDescriptions: TestCaseDescription[]) => {
  const testRailsTestCases = await TestRailsService.getTestCases();

  const missingTestCases = testRailsTestCases.filter(
    (testRailsTestCase) =>
      !testCasesDescriptions.some((testCaseDescription) => testCaseDescription.id === testRailsTestCase.id)
  );

  const includeMissingTestCases = await ConsoleUtils.getInput(
    `${missingTestCases.length} found in TestRails but not in our local test cases file. Would you like to delete them as well? (y/n)`
  );

  return includeMissingTestCases === "y"
    ? [...testCasesDescriptions, ...(missingTestCases as TestCaseDescription[])]
    : testCasesDescriptions;
};

export default async function handler(): Promise<void> {
  console.log("\nDelete test cases in TestRails");
  console.log("Test cases without an ID will be omitted.\n");

  try {
    const testCasesFilePath = await FileUtils.getFilePath("Enter the test cases file path: ");
    const testCasesFileContent = FileUtils.getFileContent(testCasesFilePath) || "";
    const testCasesDescriptions = TestRailsService.extractTestCasesDescriptions(testCasesFileContent);
    const testCasesDescriptionsToDelete = await getMissingTests(testCasesDescriptions);

    if (!testCasesDescriptionsToDelete.length) return console.log("Nothing to delete.\n");

    const confirm = await ConsoleUtils.getInput(
      `${testCasesDescriptionsToDelete.length} found. Enter "delete" to delete them in TestRails:\n`
    );

    if (confirm === "delete") {
      await TestRailsService.deleteTestCases(testCasesDescriptionsToDelete);
      fs.writeFileSync(testCasesFilePath, "", "utf8");
    }
  } catch (err) {
    ConsoleUtils.logError(err);
  }
}

import fs from "fs";
import { Config } from "../definitions/config.definitions";
import { Rl } from "../definitions/read-line.definitions";
import { TestCase, TestCaseDescription } from "../definitions/test-case.definitions";
import TestCaseService from "../services/test-case.services";
import ConsoleUtils from "../utils/console.utils";
import FileUtils from "../utils/file.utils";

const promptTestCaseOptions = async (): Promise<TestCase> => {
  const options: TestCase = { ...Config.testRails.testCaseOptions };

  const setOptions = await ConsoleUtils.getInput(
    "\nWould you like to use the TestRail test case options from your config file? (y/n): "
  );
  if (setOptions === "y") return options;

  const {
    section_id,
    template,
    type_id,
    priority_id,
    refs,
    custom_manual_vs_automated,
    custom_automation_tool_type,
    custom_test_level,
  } = options;

  options.section_id =
    (await ConsoleUtils.getInput(`Enter TestRails test case Section (default: ${section_id}): `)) || section_id;

  options.template =
    parseInt(await ConsoleUtils.getInput(`Enter TestRails test case Template (default: ${template}): `)) || template;

  options.type_id =
    parseInt(await ConsoleUtils.getInput(`Enter TestRails test case Type (default: ${type_id}): `)) || type_id;

  options.priority_id =
    parseInt(await ConsoleUtils.getInput(`Enter TestRails test case Priority (default: ${priority_id}): `)) ||
    priority_id;

  options.refs = (await ConsoleUtils.getInput(`Enter TestRails test case References (default: ${refs}): `)) || refs;

  options.custom_manual_vs_automated =
    parseInt(
      await ConsoleUtils.getInput(
        `Enter TestRails test case Manual vs Automated (default: ${custom_manual_vs_automated}): `
      )
    ) || custom_manual_vs_automated;

  options.custom_automation_tool_type =
    parseInt(
      await ConsoleUtils.getInput(
        `Enter TestRails test case Automation Tool Type (default: ${custom_automation_tool_type}): `
      )
    ) || custom_automation_tool_type;

  options.custom_test_level =
    parseInt(await ConsoleUtils.getInput(`Enter TestRails test case Test Level (default: ${custom_test_level}): `)) ||
    custom_test_level;

  return options;
};

const createTestCasesWithChatGpt = async (codeFileContent: string, testCasesFileContent: string): Promise<string> => {
  console.log("\nCreating test cases...");

  const testCases = await TestCaseService.createTestCases(codeFileContent, testCasesFileContent);
  if (!testCases?.length) throw new Error("Unable to create test cases");

  console.log("Test cases created");
  return testCases;
};

const extractTestCasesDescriptions = async (testCasesContent: string): Promise<TestCaseDescription[]> => {
  console.log("\nExtracting test cases descriptions...");

  const testCaseDescriptions = TestCaseService.extractTestCasesDescriptions(testCasesContent);
  if (!testCaseDescriptions.length) throw new Error("Unable to extract test cases descriptions");

  console.log("Unit tests descriptions extracted");
  return testCaseDescriptions;
};

const addTestCasesToTestRails = async (
  testCaseDescriptions: TestCaseDescription[],
  options: TestCase
): Promise<TestCase[]> => {
  console.log("\nAdding new test cases...");

  const newTestCasesDescriptions = testCaseDescriptions.filter((testCase) => !testCase.id);
  if (!newTestCasesDescriptions.length) console.log("No new test cases to add");

  const newTestCases = await TestCaseService.addTestCases(testCaseDescriptions, options);

  if (newTestCasesDescriptions.length !== newTestCases.length) {
    throw new Error(
      `Only ${newTestCases.length} out of ${newTestCasesDescriptions.length} test cases were added to TestRails. Would you like to revert by removing the newly added test cases to TesRails? (y/n): `
    );
  }

  console.log("New test cases added");
  return newTestCases;
};

const concatTestCasesContent = async (
  testCasesFileContent: string,
  newTestCasesContent: string,
  newTestCases: TestCase[]
): Promise<string> => {
  // Update new test cases descriptions with their ids
  newTestCases.forEach((testCase) => {
    // FIXME: Not working, not getting the id
    newTestCasesContent = newTestCasesContent.replace(testCase.title || "", `${testCase.id}: ${testCase.title}`);
    ConsoleUtils.logTestCaseDescription("add", testCase);
  });

  const testCasesContent = newTestCasesContent
    ? testCasesFileContent.concat(newTestCasesContent)
    : testCasesFileContent;

  return testCasesContent;
};

const handler = async (): Promise<void> => {
  try {
    const codeFilePath = await FileUtils.getCodeFilePath();
    const testCasesFilePath = await FileUtils.getTestCasesFilePath(codeFilePath);
    const testCaseOptions = await promptTestCaseOptions();

    const codeFileContent = fs.readFileSync(codeFilePath, "utf8");
    const testCasesFileContent = fs.readFileSync(testCasesFilePath, "utf8");

    const newTestCasesContent = await createTestCasesWithChatGpt(codeFileContent, testCasesFileContent);
    const testCasesDescriptions = await extractTestCasesDescriptions(newTestCasesContent);
    const newTestCases = await addTestCasesToTestRails(testCasesDescriptions, testCaseOptions);
    const testCases = await concatTestCasesContent(testCasesFileContent, newTestCasesContent, newTestCases);

    fs.writeFileSync(testCasesFilePath, testCases, "utf8");
    console.log("Test cases file updated\n");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    Rl.close();
  }
};

const CreateTestCasesHandler = {
  handler,
};

export default CreateTestCasesHandler;

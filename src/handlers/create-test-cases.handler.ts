import fs from "fs";
import { Config } from "../definitions/config.definitions";
import { Rl } from "../definitions/read-line.definitions";
import { TestCase, TestCaseDescription } from "../definitions/test-case.definitions";
import TestCaseService from "../services/test-case.services";
import ConsoleUtils from "../utils/console.utils";
import FileUtils from "../utils/file.utils";

const promptTestCaseOptions = async (): Promise<TestCase> => {
  const options: TestCase = { ...Config.testRails.testCaseOptions };

  const setOptions = await ConsoleUtils.getInput("Use the TestRails test case options in your config file? (y/n): ");
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

const getTestCases = async (codeFilePath: string, testCasesFilePath: string): Promise<string> => {
  const codeFileContent = fs.readFileSync(codeFilePath, "utf8");
  const currentTestCasesFileContent = fs.readFileSync(testCasesFilePath, "utf8");

  console.log("\nCreating new test cases...");
  const newTestCases = await TestCaseService.createTestCases(codeFileContent, currentTestCasesFileContent);

  const testCasesContent = newTestCases
    ? currentTestCasesFileContent.concat(newTestCases)
    : currentTestCasesFileContent;
  if (!testCasesContent) throw new Error("Unable to create test cases");

  console.log("New test cases created");
  return testCasesContent;
};

const extractTestCaseDescriptions = async (testCases: string): Promise<TestCaseDescription[]> => {
  console.log("\nExtracting test cases descriptions...");

  const testCaseDescriptions = await TestCaseService.extractTestCasesDescriptions(testCases);
  if (!testCaseDescriptions.length) throw new Error("Unable to extract test cases descriptions");

  console.log("Unit tests descriptions extracted");
  return testCaseDescriptions;
};

const addTestCases = async (
  testCaseDescriptions: TestCaseDescription[],
  options: TestCase
): Promise<TestCaseDescription[]> => {
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
  return testCaseDescriptions;
};

const handler = async (): Promise<void> => {
  try {
    const codeFilePath = await FileUtils.getCodeFilePath();
    const testCasesFilePath = await FileUtils.getTestCasesFilePath(codeFilePath);
    const testCaseOptions = await promptTestCaseOptions();
    const testCasesContent = await getTestCases(codeFilePath, testCasesFilePath);
    const currentTestCaseDescriptions = await extractTestCaseDescriptions(testCasesContent);
    const newTestCaseDescriptions = await addTestCases(currentTestCaseDescriptions, testCaseOptions);

    // Display new test cases
    newTestCaseDescriptions.forEach((testCasedescription) =>
      ConsoleUtils.logTestCaseStatus("add", testCasedescription)
    );
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

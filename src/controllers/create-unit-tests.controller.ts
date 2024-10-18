import fs from "fs";
import path from "path";
import { config } from "../definitions/config.definitions";
import { rl } from "../definitions/read-line.definitions";
import { Description, TestCase } from "../definitions/test-case.definitions";
import testCaseService from "../services/test-case.services";
import consoleUtils from "../utils/console.utils";
import fileUtils from "../utils/file.utils";

const configTestCase = config.testRails.testCase;

const getCodeFilePath = async (): Promise<string> => {
  const filePath = await consoleUtils.getInput(`Enter the file path (e.g folder/file.ext): `);

  if (!fs.existsSync(filePath)) throw new Error(`"${filePath}" is not a valid file path`);

  return filePath;
};

const getUnitTestsFilePath = async (filePath: string): Promise<string> => {
  const unitTestsFilePath = await consoleUtils.getInput(
    "Enter the unit tests file path or empty to create a new one: "
  );

  if (!unitTestsFilePath) {
    return fileUtils.createUnitTestsFile(filePath);
  }

  const isTestFileInvalid =
    !fs.existsSync(unitTestsFilePath) || path.extname(unitTestsFilePath) !== config.testExtension;

  if (isTestFileInvalid) {
    throw new Error(`Invalid unit test file path or extension "${unitTestsFilePath}"`);
  }

  return unitTestsFilePath;
};

const promptTestCaseOptions = async (): Promise<TestCase> => {
  const testCase: TestCase = { ...configTestCase };

  testCase.section_id =
    (await consoleUtils.getInput(`Enter TestRails test case Section (default: ${configTestCase.section_id}): `)) ||
    configTestCase.section_id;

  testCase.template =
    parseInt(
      await consoleUtils.getInput(`Enter TestRails test case Template (default: ${configTestCase.template}): `)
    ) || configTestCase.template;

  testCase.type_id =
    parseInt(await consoleUtils.getInput(`Enter TestRails test case Type (default: ${configTestCase.type_id}): `)) ||
    configTestCase.type_id;

  testCase.priority_id =
    parseInt(
      await consoleUtils.getInput(`Enter TestRails test case Priority (default: ${configTestCase.priority_id}): `)
    ) || configTestCase.priority_id;

  testCase.refs =
    (await consoleUtils.getInput(`Enter TestRails test case References (default: ${configTestCase.refs}): `)) ||
    configTestCase.refs;

  testCase.custom_manual_vs_automated =
    parseInt(
      await consoleUtils.getInput(
        `Enter TestRails test case Manual vs Automated (default: ${configTestCase.custom_manual_vs_automated}): `
      )
    ) || configTestCase.custom_manual_vs_automated;

  testCase.custom_automation_tool_type =
    parseInt(
      await consoleUtils.getInput(
        `Enter TestRails test case Automation Tool Type (default: ${configTestCase.custom_automation_tool_type}): `
      )
    ) || configTestCase.custom_automation_tool_type;

  testCase.custom_test_level =
    parseInt(
      await consoleUtils.getInput(
        `Enter TestRails test case Test Level (default: ${configTestCase.custom_test_level}): `
      )
    ) || configTestCase.custom_test_level;

  return testCase;
};

const getUnitTests = async (codeFilePath: string, unitTestsFilePath: string): Promise<string> => {
  const code = fs.readFileSync(codeFilePath, "utf8");
  const currentUnitTests = fs.readFileSync(unitTestsFilePath, "utf8");

  console.log("\nCreating new unit tests...");
  const newUnitTests = await testCaseService.createUnitTests(code, currentUnitTests);

  const unitTests = newUnitTests ? currentUnitTests.concat(newUnitTests) : currentUnitTests;
  if (!unitTests) throw new Error("Unable to create unit tests");

  return unitTests;
};

const addUnitTests = async (unitTests: string, options: TestCase): Promise<Description[]> => {
  console.log("Extracting unit tests descriptions...");

  const unitTestsDescriptions = await testCaseService.extractUnitTestsDescriptions(unitTests);
  if (!unitTestsDescriptions.length) throw new Error("Unable to extract unit tests descriptions");

  const newUnitTestsDescriptions = unitTestsDescriptions.filter((testCase) => !testCase.id);
  if (!newUnitTestsDescriptions.length) console.log("No new unit tests to add");

  const newUnitTests = await testCaseService.addUnitTests(unitTestsDescriptions, options);
  if (newUnitTestsDescriptions.length !== newUnitTests.length)
    throw new Error(
      `Only ${newUnitTests.length} out of ${newUnitTestsDescriptions.length} unit tests were added to TestRails. Would you like to revert by removing the newly added test cases to TesRails? (y/n): `
    );

  return unitTestsDescriptions;
};

export default async function createUnitTests(): Promise<void> {
  try {
    const codeFilePath = await getCodeFilePath();
    const unitTestsFilePath = await getUnitTestsFilePath(codeFilePath);
    const testCaseOptions = await promptTestCaseOptions();
    const unitTests = await getUnitTests(codeFilePath, unitTestsFilePath);
    const newUnitTests = await addUnitTests(unitTests, testCaseOptions);

    // Display new unit tests
    newUnitTests.forEach(
      (testCase) => testCase.id && consoleUtils.logTestCaseStatus("add", testCase.id, testCase.title)
    );
  } catch (err) {
    console.error("Error:", err);
  } finally {
    rl.close();
  }
}

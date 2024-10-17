import fs from "fs";
import path from "path";
import { TestCase } from "../definitions/test-rails.definitions";
import { rl } from "../definitions/read-line.definitions";
import testCaseService from "../services/test-case.services";
import consoleUtils from "../utils/console.utils";
import fileUtils from "../utils/file.utils";
import { config } from "../definitions/config.definitions";

const readTestCase = async (): Promise<TestCase> => {
  const configTestCase = config.testRails.testCase;
  const testCase: TestCase = { ...configTestCase };

  testCase.section_id =
    (await consoleUtils.askQuestion(`Enter TestRail test case Section (default: ${configTestCase.section_id}): `)) ||
    configTestCase.section_id;

  testCase.template =
    parseInt(
      await consoleUtils.askQuestion(`Enter TestRail test case Template (default: ${configTestCase.template}): `)
    ) || configTestCase.template;

  testCase.type_id =
    parseInt(await consoleUtils.askQuestion(`Enter TestRail test case Type (default: ${configTestCase.type_id}): `)) ||
    configTestCase.type_id;

  testCase.priority_id =
    parseInt(
      await consoleUtils.askQuestion(`Enter TestRail test case Priority (default: ${configTestCase.priority_id}): `)
    ) || configTestCase.priority_id;

  testCase.refs =
    (await consoleUtils.askQuestion(`Enter TestRail test case References (default: ${configTestCase.refs}): `)) ||
    configTestCase.refs;

  testCase.custom_manual_vs_automated =
    parseInt(
      await consoleUtils.askQuestion(`Manual vs Automated (default: ${configTestCase.custom_manual_vs_automated}): `)
    ) || configTestCase.custom_manual_vs_automated;

  testCase.custom_automation_tool_type =
    parseInt(
      await consoleUtils.askQuestion(`Automation Tool Type (default: ${configTestCase.custom_automation_tool_type}): `)
    ) || configTestCase.custom_automation_tool_type;

  testCase.custom_test_level =
    parseInt(await consoleUtils.askQuestion(`Test Level (default: ${configTestCase.custom_test_level}): `)) ||
    configTestCase.custom_test_level;

  return testCase;
};

const readUnitTestFilePath = async (filePath: string): Promise<string> => {
  const unitTestsFilePath = await consoleUtils.askQuestion("Enter the unit tests file path (leave blank to create): ");

  if (!unitTestsFilePath) {
    return fileUtils.createUnitTestsFile(filePath, config.testExtension);
  }

  const isTestFileInvalid =
    !fs.existsSync(unitTestsFilePath) || path.extname(unitTestsFilePath) !== config.testExtension;

  if (isTestFileInvalid) {
    throw new Error(`Invalid unit test file path or extension "${unitTestsFilePath}"`);
  }

  return unitTestsFilePath;
};

const readFilePath = async (): Promise<string> => {
  const filePath = await consoleUtils.askQuestion("Enter the file path: ");

  if (!fs.existsSync(filePath)) throw new Error(`"${filePath}" is not a valid file path`);

  return filePath;
};

export default async function createUnitTests(): Promise<void> {
  try {
    console.log("TEST 1");
    const filePath = await readFilePath();
    console.log("TEST 2");
    const unitTestsFilePath = await readUnitTestFilePath(filePath);
    console.log("TEST 3");
    const testCase = await readTestCase();

    await testCaseService.createTestCases(unitTestsFilePath, testCase);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    rl.close();
  }
}

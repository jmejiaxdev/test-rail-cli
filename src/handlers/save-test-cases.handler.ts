import fs from "fs";
import { Config } from "../definitions/config.definitions";
import { Rl } from "../definitions/read-line.definitions";
import { TestCase } from "../definitions/test-case.definitions";
import TestRailsService from "../services/test-rails.service";
import ConsoleUtils from "../utils/console.utils";
import FileUtils from "../utils/file.utils";

const promptTestCaseOptions = async (): Promise<TestCase> => {
  const options: TestCase = { ...Config.testRails.testCase };

  const useConfig = await ConsoleUtils.getInput(
    "\nWould you like to use the TestRail test case options from your config file? (y/n): "
  );
  if (useConfig === "y") return options;

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

const getNewTestCasesContent = (testCases: TestCase[], testCasesFileContent: string) => {
  const toNewContent = (content: string, newTestCase: TestCase) =>
    content.replace(newTestCase?.title || "", `${newTestCase.id}: ${newTestCase.title}`);

  return testCases.reduce(toNewContent, testCasesFileContent);
};

export default async function handler(): Promise<void> {
  console.log(
    "Save test cases to TestRails. Test cases without an ID will be created, while those with an existing ID will be updated. \n"
  );

  try {
    const testCaseOptions = await promptTestCaseOptions();
    const testCasesFilePath = await FileUtils.getFilePath("Enter the test cases file path: ");
    const testCasesFileContent = FileUtils.getFileContent(testCasesFilePath) || "";
    const testCasesDescriptions = TestRailsService.extractTestCasesDescriptions(testCasesFileContent);
    const newTestCases = await TestRailsService.saveTestCases(testCasesDescriptions, testCaseOptions);
    const newTestContent = getNewTestCasesContent(newTestCases, testCasesFileContent);

    fs.writeFileSync(testCasesFilePath, newTestContent, "utf8");
    console.log("Test cases saved to TestRails");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    Rl.close();
  }
}

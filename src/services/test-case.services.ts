import fs from "fs";
import openAIAPI from "../api/open-ai.api";
import testRailsAPI from "../api/test-rails.api";
import { TestCase } from "../definitions/test-rails.definitions";
import { ANSIColor } from "../definitions/color.definitions";
import consoleUtils from "../utils/console.utils";

const createTestCases = async (filePath: string, testCase: TestCase): Promise<void> => {
  let unchangedCount = 0,
    createdCount = 0,
    deletedCount = 0;

  let testRailsTestCases = await testRailsAPI.getTestCases();

  let match: RegExpExecArray | null;
  const regex = /test\(["'`](\d{6,8})?:?\s*([^\n"']+)["'`]\s*,/g;
  const fileContent = fs.readFileSync(filePath, "utf8");

  while ((match = regex.exec(fileContent)) !== null) {
    const testDescription = { id: match[1], title: match[2].trim() };

    if (testRailsTestCases.some((tc) => tc.id === testDescription.id)) {
      testRailsTestCases = testRailsTestCases.filter((tc) => tc.id !== testDescription.id);
      consoleUtils.logTestCaseStatus("unchanged", testDescription.id, testDescription.title);
      unchangedCount++;
      continue;
    }

    try {
      testDescription.title =
        (await openAIAPI.getChatGPTResponse(
          `Convert the following test title to Gherkin format: "${testDescription.title}"`
        )) || testDescription.title;

      const newTestCase = await testRailsAPI.createTestCase({ ...testCase, ...testDescription });
      fileContent.concat(`\n${newTestCase}\n`);

      consoleUtils.logTestCaseStatus("created", testDescription.id, testDescription.title);
      createdCount++;
    } catch (error) {
      console.error("Error creating test case:", error);
    }
  }

  fs.writeFileSync(filePath, fileContent, "utf8");

  if (testRailsTestCases.length > 0) {
    const confirm = await consoleUtils.confirmTestCasesDeletion(testRailsTestCases, filePath);

    if (confirm === "delete") {
      testRailsTestCases.forEach((tc) => testRailsAPI.deleteTestCase(tc.id));
      console.log(`${testRailsTestCases.length} test cases marked as deleted.`);
      deletedCount += testRailsTestCases.length;
    }
  }

  console.log(ANSIColor.Green, `- ${createdCount} test cases created.`);
  console.log(ANSIColor.Yellow, `- ${unchangedCount} test cases unchanged.`);
  console.log(ANSIColor.Red, `- ${deletedCount} test cases deleted.`);
};

const testCaseService = {
  createTestCases,
};

export default testCaseService;

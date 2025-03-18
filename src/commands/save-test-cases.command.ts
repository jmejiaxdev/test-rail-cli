import { promptTestCaseOptions } from "../utils/console.utils";
import { getFileContent, getFilePath, getFileTitles } from "../utils/file.utils";
import { addTestCase, updateTestCase } from "../api/test-rails.api";

export const saveTestCasesCommand = async (): Promise<void> => {
  console.log("\nSaving test cases...\n");

  const options = await promptTestCaseOptions();
  const filePath = await getFilePath("Enter the test cases file path: ");
  const fileContent = getFileContent(filePath) || "";
  const fileTestTitles = getFileTitles(fileContent);

  let countSaved = 0;
  let countFailed = 0;

  for (const [id, title] of fileTestTitles) {
    try {
      const testCase = id ? await updateTestCase({ ...options, id, title }) : await addTestCase({ ...options, title });
      console.log(`'${testCase.title}' saved`);
      countSaved++;
    } catch (error) {
      console.error(`Failed to save test case '${id ?? "XXXXXXXXX"}: ${title}':`, error);
      countFailed++;
    }
  }

  console.log(`${countSaved} test cases saved`);
  console.log(`${countFailed} test cases failed to update`);
};

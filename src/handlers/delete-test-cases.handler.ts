// import fs from "fs";
// import path from "path";
// import { config } from "../definitions/config.definitions";
// import { rl } from "../definitions/read-line.definitions";
// import { TestCase, TestCaseDescription } from "../definitions/test-case.definitions";
// import testCaseService from "../services/test-case.services";
// import consoleUtils from "../utils/console.utils";
// import fileUtils from "../utils/file.utils";

// const configTestCase = config.testRails.testCase;

// export default async function deleteUnitTests(): Promise<void> {
//   try {
//     const codeFilePath = await getCodeFilePath();
//     const unitTestsFilePath = await getUnitTestsFilePath(codeFilePath);
//     const testCaseOptions = await promptTestCaseOptions();
//     const unitTests = await getUnitTests(codeFilePath, unitTestsFilePath);
//     const newUnitTests = await addUnitTests(unitTests, testCaseOptions);

//     // Display new test cases
//     newUnitTests.forEach(
//       (testCase) => testCase.id && consoleUtils.logTestCaseDescription("add", testCase)
//     );
//   } catch (err) {
//     console.error("Error:", err);
//   } finally {
//     rl.close();
//   }
// }

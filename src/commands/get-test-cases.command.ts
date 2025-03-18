import { fetchTestCases } from "../api/test-rails.api";

export const getTestCasesCommand = async () => {
  console.log("\nGetting test cases...\n");

  const testCases = await fetchTestCases();

  testCases.forEach((testCase) => {
    console.log(`Title: ${testCase.title}`);
  });

  console.log(`${testCases.length} test cases`);
};

import { TestCase } from "../definitions/test-case.definition";

// This regular expression is designed to extract the following information from test() calls:
// - The optional numerical ID (if present).
// - The title string.
const regex = /test\(["'`](\d{6,8})?:?\s*([^\n"']+)["'`]\s*,/g;

export default function extractTestCases(fileContent: string): TestCase[] {
  const testCases: TestCase[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(fileContent)) !== null) {
    const id = match[1];
    const title = match[2].trim();
    testCases.push({ id, title });
  }

  return testCases;
}

import { TestCase } from "../definitions/test-case.definition";

export default function toTestCase(fileContent: string, testCase: TestCase, gherkinTitle: string): string {
  const { id, title } = testCase;
  return fileContent.replace(new RegExp(`test\\(["'\`]${title}["'\`]`, "g"), `test("${id}: ${gherkinTitle}"`);
}

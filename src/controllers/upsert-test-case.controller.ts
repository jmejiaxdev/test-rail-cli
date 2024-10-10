import addTestRailCase from "../api/add-test-rail-case.api";
import { TestCase } from "../definitions/test-case.definition";

export default async function upsertTestCase(
  title: TestCase["title"],
  id: TestCase["id"]
): Promise<TestCase | undefined> {
  if (id) {
    console.log("TODO: Updating test case", id);
    return;
  } else {
    const createResponse = await addTestRailCase(title);
    console.log("Test case created", createResponse.data.id);
    return createResponse.data as TestCase;
  }
}

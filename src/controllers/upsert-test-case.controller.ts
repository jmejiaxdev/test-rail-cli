import addTestRailCase from "../api/add-test-rail-case.api";
import { TestCase } from "../definitions/test-case.definition";

export default async function upsertTestCase(
  id: TestCase["id"],
  title: TestCase["title"]
): Promise<TestCase | undefined> {
  if (id) {
    // TODO: Implement update test case
    console.log("Updating test case:", id);
    return;
  } else {
    const createResponse = await addTestRailCase(title);
    console.log("Test case created:", createResponse.data.id);
    return createResponse.data as TestCase;
  }
}

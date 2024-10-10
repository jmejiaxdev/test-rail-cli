import testRailClient from "../clients/test-rail.client";
import { TestCase } from "../definitions/test-case.definition";

export default async function getTestRailCase(id: TestCase["id"]) {
  return await testRailClient.get(`get_test/${id}`);
}

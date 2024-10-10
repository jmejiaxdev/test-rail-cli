import testRailClient from "../clients/test-rail.client";
import {
  AutomationToolType,
  ManualVSAutomated,
  Priority,
  Template,
  TestCase,
  TestLevel,
  Type,
  TypeAutomation,
} from "../definitions/test-case.definition";

const refs = process.env.TEST_RAIL_REFS;
const sectionId = process.env.TEST_RAIL_SECTION_ID;

export default async function addTestRailCase(title: TestCase["title"]) {
  return await testRailClient.post(`add_case/${sectionId}`, {
    title,
    template: Template.TestCase,
    type_id: Type.UnitTest,
    priority_id: Priority.MustTest,
    refs,
    custom_manual_vs_automated: ManualVSAutomated.Automated,
    custom_manual_automated: TypeAutomation.UnitTest,
    custom_automation_tool_type: AutomationToolType.Jest,
    custom_test_level: TestLevel.UnitTest,
  });
}

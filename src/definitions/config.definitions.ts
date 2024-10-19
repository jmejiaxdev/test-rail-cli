import {
  AutomationToolType,
  ManualVSAutomated,
  Priority,
  Template,
  TestLevel,
  Type,
  TypeAutomation,
} from "./test-case.definitions";

// interface TestRailsConfig {
//   baseURL: string;
//   password: string;
//   projectId: string;
//   suiteId: string;
//   testCase: TestCase;
//   username: string;
// }

// interface OpenAIConfig {
//   apiKey: string;
//   model: string;
//   projectId: string;
// }

// interface TestSyncAIConfig {
//   openAI: OpenAIConfig;
//   testExtension: string;
//   testRails: TestRailsConfig;
// }

// export const configuration: TestSyncAIConfig = {
export const Config = {
  openAI: {
    apiKey: process.env.OPEN_AI_API_KEY || "",
    model: process.env.OPEN_AI_MODEL || "gpt-4o-mini",
    projectId: process.env.OPEN_AI_PROJECT_ID || "",
  },
  testExtension: process.env.TEST_EXTENSION || ".test",
  testRails: {
    baseURL: process.env.TEST_RAILS_BASE_URL || "",
    username: process.env.TEST_RAILS_USERNAME || "",
    password: process.env.TEST_RAILS_API_KEY || "",
    projectId: process.env.TEST_RAILS_PROJECT_ID || "",
    suiteId: process.env.TEST_RAILS_SUITE_ID || "",
    testCaseOptions: {
      section_id: process.env.TEST_CASE_OPTION_SECTION_ID,
      template: process.env.TEST_CASE_OPTION_TEMPLATE
        ? parseInt(process.env.TEST_CASE_OPTION_TEMPLATE)
        : Template.TestCase,
      type_id: process.env.TEST_CASE_OPTION_TYPE_ID ? parseInt(process.env.TEST_CASE_OPTION_TYPE_ID) : Type.UnitTest,
      priority_id: process.env.TEST_CASE_OPTION_PRIORITY_ID
        ? parseInt(process.env.TEST_CASE_OPTION_PRIORITY_ID)
        : Priority.MustTest,
      refs: process.env.TEST_CASE_OPTION_REFS,
      custom_manual_vs_automated: process.env.TEST_CASE_OPTION_CUSTOM_MANUAL_VS_AUTOMATED
        ? parseInt(process.env.TEST_CASE_OPTION_CUSTOM_MANUAL_VS_AUTOMATED)
        : ManualVSAutomated.Automated,
      custom_manual_automated: process.env.TEST_CASE_OPTION_CUSTOM_MANUAL_AUTOMATED
        ? parseInt(process.env.TEST_CASE_OPTION_CUSTOM_MANUAL_AUTOMATED)
        : TypeAutomation.UnitTest,
      custom_automation_tool_type: process.env.TEST_CASE_OPTION_CUSTOM_AUTOMATION_TOOL_TYPE
        ? parseInt(process.env.TEST_CASE_OPTION_CUSTOM_AUTOMATION_TOOL_TYPE)
        : AutomationToolType.Jest,
      custom_test_level: process.env.TEST_CASE_OPTION_CUSTOM_TEST_LEVEL
        ? parseInt(process.env.TEST_CASE_OPTION_CUSTOM_TEST_LEVEL)
        : TestLevel.UnitTest,
    },
  },
};

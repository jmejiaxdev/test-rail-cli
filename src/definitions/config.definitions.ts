import {
  AutomationToolType,
  ManualVSAutomated,
  Priority,
  Template,
  TestCase,
  TestLevel,
  Type,
  TypeAutomation,
} from "./test-rails.definitions";

interface TestRailsConfig {
  baseURL: string;
  password: string;
  projectId: string;
  suiteId: string;
  testCase: TestCase;
  username: string;
}

interface OpenAIConfig {
  apiKey: string;
  model: string;
}

interface TestSyncAIConfig {
  openAI: OpenAIConfig;
  testExtension: string;
  testRails: TestRailsConfig;
}

export const config: TestSyncAIConfig = {
  openAI: {
    apiKey: process.env.OPEN_AI_API_KEY || "",
    model: process.env.OPEN_AI_MODEL || "gpt-3.5-turbo",
  },
  testExtension: process.env.TEST_EXTENSION || ".test",
  testRails: {
    baseURL: process.env.TEST_RAILS_BASE_URL || "",
    password: process.env.TEST_RAILS_API_KEY || "",
    projectId: process.env.TEST_RAILS_PROJECT_ID || "",
    suiteId: process.env.TEST_RAILS_SUITE_ID || "",
    testCase: {
      section_id: process.env.TEST_RAILS_SECTION_ID,
      template: process.env.TEST_RAILS_TEMPLATE ? parseInt(process.env.TEST_RAILS_TEMPLATE) : Template.TestCase,
      type_id: process.env.TEST_RAILS_TYPE_ID ? parseInt(process.env.TEST_RAILS_TYPE_ID) : Type.UnitTest,
      priority_id: process.env.TEST_RAILS_PRIORITY_ID
        ? parseInt(process.env.TEST_RAILS_PRIORITY_ID)
        : Priority.MustTest,
      refs: process.env.TEST_RAILS_REFS,
      custom_manual_vs_automated: process.env.TEST_RAILS_CUSTOM_MANUAL_VS_AUTOMATED
        ? parseInt(process.env.TEST_RAILS_CUSTOM_MANUAL_VS_AUTOMATED)
        : ManualVSAutomated.Automated,
      custom_manual_automated: process.env.TEST_RAILS_CUSTOM_MANUAL_AUTOMATED
        ? parseInt(process.env.TEST_RAILS_CUSTOM_MANUAL_AUTOMATED)
        : TypeAutomation.UnitTest,
      custom_automation_tool_type: process.env.TEST_RAILS_CUSTOM_AUTOMATION_TOOL_TYPE
        ? parseInt(process.env.TEST_RAILS_CUSTOM_AUTOMATION_TOOL_TYPE)
        : AutomationToolType.Jest,
      custom_test_level: process.env.TEST_RAILS_CUSTOM_TEST_LEVEL
        ? parseInt(process.env.TEST_RAILS_CUSTOM_TEST_LEVEL)
        : TestLevel.UnitTest,
    },
    username: process.env.TEST_RAILS_USERNAME || "",
  },
};

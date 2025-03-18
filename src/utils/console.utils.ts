import { isAxiosError } from "axios";
import { ANSIColor, RL } from "../definitions/console.definitions";
import { ENV } from "../config/env.config";
import { TestCase } from "../definitions/test-case.definitions";

export const getInput = async (prompt: string): Promise<string> => {
  return new Promise((resolve) => RL.question(prompt, (input) => resolve(input)));
};

export const promptTestCaseOptions = async (): Promise<TestCase> => {
  console.log("Using your .env file defaults...");

  const { testCase } = ENV;

  const {
    section_id,
    template,
    type_id,
    priority_id,
    refs,
    custom_manual_vs_automated,
    custom_automation_tool_type,
    custom_test_level,
  } = testCase;

  testCase.section_id = (await getInput(`Enter Section ID: ${section_id})`)) || section_id;

  testCase.template = parseInt(await getInput(`Enter Template: ${template}`)) || template;

  testCase.type_id = parseInt(await getInput(`Enter Type ID: ${type_id}`)) || type_id;

  testCase.priority_id = parseInt(await getInput(`Enter Priority: ${priority_id}`)) || priority_id;

  testCase.refs = (await getInput(`Enter References: ${refs}`)) || refs;

  testCase.custom_manual_vs_automated =
    parseInt(await getInput(`Enter Manual vs Automated: ${custom_manual_vs_automated}`)) || custom_manual_vs_automated;

  testCase.custom_automation_tool_type =
    parseInt(await getInput(`Enter Automation Tool Type: ${custom_automation_tool_type}`)) ||
    custom_automation_tool_type;

  testCase.custom_test_level = parseInt(await getInput(`Enter Test Level: ${custom_test_level}`)) || custom_test_level;

  return testCase;
};

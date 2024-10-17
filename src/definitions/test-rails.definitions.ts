export interface Suite {
  id: number;
  name: string;
}

export enum Template {
  TestCase = 1,
}

export enum Type {
  UnitTest = 16,
}

export enum Priority {
  MustTest = 1,
}

export enum ManualVSAutomated {
  None = 0,
  Automated = 3,
}

export enum TypeAutomation {
  None = 0,
  UnitTest = 4,
}

export enum AutomationToolType {
  None = 0,
  Jest = 1,
}

export enum TestLevel {
  None = 0,
  UnitTest = 1,
}

export interface TestCase {
  id?: string;
  title?: string;
  section_id?: string;
  template?: Template;
  type_id?: Type;
  priority_id?: Priority;
  refs?: string;
  custom_manual_vs_automated?: ManualVSAutomated;
  custom_manual_automated?: TypeAutomation;
  custom_automation_tool_type?: AutomationToolType;
  custom_test_level?: TestLevel;
}

export type TestDescription = Pick<TestCase, "id" | "title">;

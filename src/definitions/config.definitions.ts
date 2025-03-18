import type { TestCase } from "./test-case.definitions";

export type Api = {
  username: string;
  password: string;
  organizationUrl: string;
  projectId: string;
  suiteId: string;
};

// export type Scan = {
//   source: "file" | "git" | "root" | "pipeline";
//   testFilePath: string;
//   rootDirectory: string;
//   testFileExtensions: string[];
//   excludedFolders: string[];
// };

export type Config = {
  api: Api;
  // scan: Scan;
  testCase: TestCase;
};
